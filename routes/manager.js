const express = require('express')

const app = express()

const methodOverride = require('method-override');
app.use(methodOverride('_method'))
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

router.get('/',requireMlogin,async function(req,res){
    const findUser = await Manager.find({_id :req.session.user_id });
    const currentevents = findUser[0].activeEvents;
    const activeEvents = await Event.find({ _id : [...currentevents]});
     //const activeEvents =  Event.find( { _id : { $all: findUser[0].activeEvents } } )
    //console.log(activeEvents);
    res.render('manager',{activeEvents});
})

router.post('/Delete',async function(req,res) {
  const DeleteEvent =  req.body.Delete;
    await Event.deleteOne({_id : DeleteEvent});
    //console.log(DeleteEvent);
    res.redirect('/manager');
})

router.post('/Edit',async function(req,res) {
    const EditEvent = req.body.Edit;
    const toeditEvent =  await Event.find({_id : EditEvent});
    const edit = toeditEvent[0];
    res.render('edit',{edit})
    //console.log(edit);
    })

router.get('/event',requireMlogin, function(req,res){
    res.render('eventDetails')
})
router.get('/logout', function(req,res){
    req.session.user_id=null;
    res.redirect('/')
})

router.patch('/EditEvent',async function(req,res){
    const editedEvent = req.body;
    const id = editedEvent._id;
   const updateEvent = await Event.findByIdAndUpdate(id , editedEvent , {new : true})
    console.log(updateEvent);
    res.redirect('/manager');
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