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

dotenv.config();
console.log(process.env.REACT_APP_MONGODB_URL, "URL")
const corsOrigin = "http://localhost:3000";
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
app.use(
  cors({
    origin: [corsOrigin],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
