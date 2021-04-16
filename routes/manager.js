const express = require('express')
const router = express.Router();
const Manager = require('../models/manager')
const {isMLoggedIn, isSLoggedIn} = require('../middleware')
const passport = require('passport')


router.get('/register', function (req, res) {
    req.flash('success', 'Login or SignUp to continue')
    res.render('managerRegister')
})
router.post('/register', async function (req, res, next) {
    const { email, username, password } = req.body;
    const user = new Manager({ email, username });
    const registeredUser = await Manager.register(user, password);
    req.login(registeredUser, function (err) {
        if (err) return next(err);
        req.flash('success', 'Welcome')
        res.redirect('/manager')
    })
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/manager/register' }), async function (req, res) {
    req.flash('success', 'Welcome back')
    res.redirect('/manager')
})
router.get('/',isMLoggedIn, function(req,res){
    res.render('manager')
})
module.exports = router;