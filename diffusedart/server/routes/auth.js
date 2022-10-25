const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', { 
    failureRedirect: '/forbidden',
    successRedirect: 'http://localhost:3000'
}));
router.get('/logout', (req, res) => {
    if(req.user) {
        req.logout();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});
router.get("/status", (req, res) => {
    if(req.user) {
       res.send(req.user)} else {
        res.send("Not logged in");
       }
    })
function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
        next();
    }
    else {
        console.log("User is not logged in.");
        res.redirect('/');
    }
}

router.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        console.log("I am authenticated")
        res.status(200).json(req.user);
        return;
    }
    console.log("I am not authenticated")
    res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;