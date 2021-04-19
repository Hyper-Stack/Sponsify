require('dotenv').config()
const express = require('express')
const router = express.Router();
const Sponsor = require('../models/sponsor')
const {isMLoggedIn, isSLoggedIn ,requireSlogin, requireMlogin,deleteAllCookies} = require('../middleware')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport')
var cookieParser = require('cookie-parser');
const Events = require('../models/events')

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
    // var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
    // res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    req.session.user_id = user._id;
    res.redirect('/sponsors')
})
router.post('/login', async function (req, res) {
    const { username, password } = req.body;
    const founduser = await Sponsor.findAndValidate(username, password);
    if (founduser) {
        req.session.user_id = founduser._id;
        // console.log(req.session.user_id)
        res.redirect('/sponsors')
    }
    else {
        res.redirect('/sponsors/register')
    }
})
router.get('/',requireSlogin,async function(req,res){
    const events = await Events.find({});
    console.log(events)
    res.render('sponsors', {events})
})
router.get('/sponsorship',requireSlogin, function(req,res){
    res.render('sponsorDetails')
})
router.get('/contact',requireSlogin,function(req,res){
    res.render('scontact')
})
router.post('MAILTO:sponsify07@gmail.com',requireSlogin,function(req,res){
    req.flash('success', 'Mail sent successfully')
    res.redirect('/sponsors')
})
router.get('/logout', function(req,res){
    req.session.user_id=null;
    res.redirect('/')
})
module.exports = router;