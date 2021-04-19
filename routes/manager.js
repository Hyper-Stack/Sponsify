const express = require('express')
const router = express.Router();
const Manager = require('../models/manager')
const {isMLoggedIn, isSLoggedIn ,requireSlogin, requireMlogin} = require('../middleware')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport')
var cookieParser = require('cookie-parser');
const Event = require('../models/events')
// var userId = 
router.get('/register', function (req, res) {
    req.flash('success', 'Login or SignUp to continue')
    res.render('managerRegister')
})
router.post('/register', async function (req, res) {
    const { username, password,email } = req.body;
    const code = await bcrypt.hash(password, 12);
    const user = new Manager({
        username,
        password: code,
        email
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/manager')
})
router.post('/login', async function (req, res) {
    const { username, password } = req.body;
    const founduser = await Manager.findAndValidate(username, password);
    if (founduser) {
        req.session.user_id = founduser._id;
        res.redirect('/manager')
    }
    else {
        res.redirect('/register')
    }
})
router.get('/',requireMlogin, function(req,res){
    res.render('manager')
})
router.get('/event',requireMlogin, function(req,res){
    res.render('eventDetails')
})
router.get('/logout', function(req,res){
    req.session.user_id=null;
    res.redirect('/')
})
router.post('/newEvent',async function(req,res){
    const newEvent = new Event(req.body);
    await newEvent.save()
    await Manager.findByIdAndUpdate(req.session.user_id, {$push:{activeEvents:newEvent}})
    const eventadded = await Event.findById(req.session.user_id).populate('activeEvents');
    console.log(eventadded);
    res.redirect('/manager');
})
module.exports = router;