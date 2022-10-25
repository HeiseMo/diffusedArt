const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const exif = require("exif-parser");
const png = require("png-metadata");
const imageModel = require("./Models/imageModel");
const dotenv = require("dotenv");
const axios = require("axios");
const queryString = require('querystring')
const session = require("express-session");
const passport = require("passport");
const store = require("connect-mongo");
dotenv.config();
const discordStrategy = require("./stratagies/discordstrategy");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//Discord OAuth2
const DiscordOauth2 = require("discord-oauth2");



const corsOrigin = "http://localhost:3000" || "http://api.diffusedhermit.com";
// mongoose connection
mongoose.connect(process.env.REACT_APP_MONGODB_URL, {
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected!");
});

app.use(express.static(__dirname + "../..")); // serve static files
app.use(session ({
  secret: "theyellowdoglovestobark",
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
  },
  store: store.create({ mongoUrl: process.env.REACT_APP_MONGODB_URL }),
}),
  cors({
    origin: [corsOrigin],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//Passport
app.use(passport.initialize());
app.use(passport.session());

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let clientId = process.env.REACT_APP_DISCORD_OAUTH_CLIENT_ID
let clientSecret = process.env.REACT_APP_DISCORD_OAUTH_SECRET
let redirectUri = process.env.REACT_APP_DISCORD_OAUTH_REDIRECT_URI
console.log(clientId, clientSecret, redirectUri)

const authRoute = require("./routes/auth");
app.use("/auth", authRoute)
app.get("/api/auth/discord/redirect", async (req, res) => {
  console.log(req.query.code)
  let code = req.query.code;
  if (req.query.code === undefined || req.query.code == '') return next();

      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', redirectUri);
      params.append('scope', 'identify');

      const response = await fetch("https://discordapp.com/api/oauth2/token", {
        method: 'POST',
        body: params,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
      });
     const json = await response.json();
      console.log(json);
     //debug('%O', json);
     res.send(json)

});

const imageUploadPath = "../public/uploads/images";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const imageUpload = multer({ storage: storage });
app.post("/image-upload", imageUpload.array("myImage"), (req, res) => {
  let filePath = req.files[0].path;
  let payload = photo(filePath, function (result) {
    return result;
  });
  console.log(payload, "this is the payload");
  imageModel.create(payload, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log("sent to mongodb");
      res.send(result);
    }
  });
});

function photo(filePath, callback) {
  // load from file
  var s = png.readFileSync(filePath);
  // split into chunks
  var list = png.splitChunk(s);
  function filterByValue(array, string) {
    return array.filter((o) => {
      return Object.keys(o).some((k) => {
        if (typeof o[k] === "string")
          return o[k].toLowerCase().includes(string.toLowerCase());
      });
    });
  }
  var filtered = filterByValue(list, "text");
  let parameters = filtered[0].data.slice(11).split(",").toString("utf8");
  let splitParameter = parameters.split("\n");
  let extraInfo = null;
  let prompt = splitParameter[0];
  let negPrompt = "";
  let steps = "";
  let cfg = "";
  let size = "";
  let sampler = "";
  let seed = "";
  let location = filePath.slice(10);
  if (splitParameter.length > 2) {
    negPrompt = splitParameter[1].slice(17);
    extraInfo = splitParameter[2].toString("utf8").split(",");
    steps = extraInfo[0].slice(7);
    sampler = extraInfo[1].slice(9);
    seed = extraInfo[3].slice(6);
    cfg = extraInfo[2].slice(11);
    size = extraInfo[4].slice(6);
    console.log(extraInfo);
  } else {
  }
  const object = {
    prompt: prompt,
    negativePrompt: negPrompt,
    steps: steps,
    cfg: cfg,
    size: size,
    sampler: sampler,
    seed: seed,
    location: location,
  };
  return object;
}

app.get("/images", (req, res) => {
  imageModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});