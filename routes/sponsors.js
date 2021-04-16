const express = require('express')
const router = express.Router();
const Sponsor = require('../models/sponsor')
const {isMLoggedIn, isSLoggedIn} = require('../middleware')
const passport = require('passport')

router.get('/register', function (req, res) {
    req.flash('success', 'Login or SignUp to continue')
    res.render('sponsorsRegister')
})
router.post('/register', async function (req, res, next) {
    const { email, username, password } = req.body;
    const user = new Sponsor({ email, username });
    const registeredUser = await Sponsor.register(user, password);
    req.login(registeredUser, function (err) {
        if (err) return next(err);
        req.flash('success', 'Welcome')
        res.redirect('/sponsors')
    })
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/sponsors/register' }), async function (req, res) {
    req.flash('success', 'Welcome back')
    res.redirect('/sponsors')
})

router.get('/',isSLoggedIn, function(req,res){
    res.render('sponsors')
})
module.exports = router;
