const router = require("express").Router();
const passport = require("passport");

router.get("/", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/forbidden",
    successRedirect: "http://diffusedhermit.com",
  })
);
/*
router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});*/
router.get("/logout", (req, res) => {
  req.session.destroy(function (err){
    console.log("error: " + err);
    console.log("session destroyed");
    //res.send("You have been logged out. <a href='/'>Login again</a>");
    res.status(200).json({loggedInUser: null, login: false});
  })
});

router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
