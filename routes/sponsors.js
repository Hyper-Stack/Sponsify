const express = require('express')
const router = express.Router();
const Sponsor = require('../models/sponsor')
const {isMLoggedIn, isSLoggedIn ,requireSlogin, requireMlogin} = require('../middleware')
const bcrypt = require('bcrypt')

const passport = require('passport')


router.get('/register', function (req, res) {
    req.flash('success', 'Login or SignUp to continue')
    res.render('sponsorsRegister')
})
router.post('/register', async function (req, res) {
    const { username, password,email } = req.body;
    const code = await bcrypt.hash(password, 12);
    const user = new Sponsor({
        username,
        password: code,
        email
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/sponsors')
})
router.post('/login', async function (req, res) {
    const { username, password } = req.body;
    const founduser = await Sponsor.findAndValidate(username, password);
    if (founduser) {
        req.session.user_id = founduser._id;
        res.redirect('/sponsors')
    }
    else {
        res.redirect('/sponsors/register')
    }
})
router.get('/',requireSlogin, function(req,res){
    res.render('sponsors')
})
router.get('/sponsorship',requireSlogin, function(req,res){
    res.render('sponsorDetails')
})
router.get('/contact',function(req,res){
    res.render('scontact')
})
module.exports = router;