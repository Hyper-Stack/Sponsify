require('dotenv').config()
const express = require('express')
const router = express.Router();
const Sponsor = require('../models/sponsor')
const {isMLoggedIn, isSLoggedIn ,requireSlogin, requireMlogin,deleteAllCookies} = require('../middleware')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport')
var cookieParser = require('cookie-parser');
const Events = require('../models/events');
const events = require('../models/events');
const { findById } = require('../models/events');
const sendMail = require('../controller/mail.js');

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
    await user.save()
        .catch(() => { req.flash('error',"Username or Email already registered");res.redirect('/sponsors/register') });
    // var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
    // res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    req.session.user_id = user._id;
    res.redirect('/sponsors')
})
router.post('/login', async function (req, res) {
    const { username, password } = req.body;
    const founduser = await Sponsor.findAndValidate(username, password)
                            .catch((err)=>{console.log(err); req.flash('error',"Invalid Credentials");res.redirect('/sponsors/register')});
    if (founduser) {
        req.session.user_id = founduser._id;
        // console.log(req.session.user_id)
        res.redirect('/sponsors')
    }
    else {
        req.flash('error', 'Invalid Credentials')
        res.redirect('/sponsors/register')
    }
})
router.get('/',requireSlogin,async function(req,res){
    const events = await Events.find({});
  //  console.log(events)
    res.render('sponsors', {events})
})
router.get('/sponsorship',requireSlogin, function(req,res){
    res.render('sponsorDetails')
})
router.post('/:id/contact',requireSlogin,async function(req,res){

    const {id} = req.params;
    const events = await Events.find({ _id : id});
    const {Email,Contact} = events[0];
    res.render('scontact',{Email,Contact})
})

router.post('MAILTO:sponsify07@gmail.com',requireSlogin,function(req,res){
    req.flash('success', 'Mail sent successfully')
    res.redirect('/sponsors')
})
router.get('/logout', function(req,res){
    req.session.user_id=null;
    res.redirect('/')
})
router.get('/cart', requireSlogin, async function(req,res){
    const findUser = await Sponsor.find({_id :req.session.user_id });
    const currentevents = findUser[0].cart;
    const events = await Events.find({ _id : [...currentevents]});
     //const activeEvents =  Event.find( { _id : { $all: findUser[0].activeEvents } } )
    //console.log(activeEvents);
    res.render('cart',{events});
})
router.post('/:id/addToCart', requireSlogin, async function(req, res){
    const {id} = req.params;
    const newEvent = await Events.findById(id);
    await (await Sponsor.findByIdAndUpdate(req.session.user_id, {$push:{cart:newEvent}}))
    // const eventadded = await Events.findById(req.session.user_id).populate("cart");
    // console.log(eventadded);
    res.redirect('/sponsors/cart')
})
router.delete('/:id/delete', requireSlogin, async function(req, res){
    const {id} = req.params;
    const deleteEvent = await Events.findOne({id});
    await (await Sponsor.findByIdAndUpdate(req.session.user_id, {$pull:{cart:id}}))
    res.redirect('/sponsors/cart')
})
router.get('/profile',async function(req,res){
    const user = await Sponsor.findById(req.session.user_id);
    console.log(user);
    res.render('sprofile',{user})
})

router.post('/profile',function(req,res) {
    const {Name,Email,message} = req.body;
    console.log('Data :',req.body);
    //sendMail(email,Name,message); //to be added
    res.redirect('/sponsors/profile');
    
})


router.get('/about', function(req,res){
    res.render('sabout')
})

module.exports = router;
