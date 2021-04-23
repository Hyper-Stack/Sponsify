require('dotenv').config()
const express = require('express')
const router = express.Router();
const Sponsor = require('../models/sponsor')
const {isMLoggedIn, isSLoggedIn ,requireSlogin, requireMlogin,deleteAllCookies} = require('../middleware')
const bcrypt = require('bcryptjs')
const Manager = require('../models/manager')
const Company = require('../models/companies')
const jwt = require('jsonwebtoken');
const passport = require('passport')
var cookieParser = require('cookie-parser');
const Events = require('../models/events');
const events = require('../models/events');
const { findById } = require('../models/events');
const sendMail = require('../controller/mail.js');
const sponsors = require('../controller/sponsors')

module.exports.getRegister = function (req, res) {
    req.flash('success', 'Login or SignUp to continue')
    res.render('sponsorsRegister')
}
module.exports.register = async function (req, res) {
    const { username, password, email } = req.body;
    const code = await bcrypt.hash(password, 12);
    const user = new Sponsor({
        username,
        password: code,
        email
    })
    await user.save()
        .catch(() => { req.flash('error', "Username or Email already registered"); res.redirect('/sponsors/register') });
    // var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
    // res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    req.session.user_id = user._id;
    res.render('sponsorDetails')
}
module.exports.login =  async function (req, res) {
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
}
module.exports.home = async function(req,res){
    const events = await Events.find({});
    res.render('sponsors', {events})
}

module.exports.companyAdd =  async function(req,res){
    const details = req.body;
    console.log(details);
    const newCompany = new Company(details);
    await newCompany.save()
        .then(()=>console.log("it worked!"))
        .catch((err)=>{console.log(err); console.log("not worked")})
    const a = await (await Sponsor.findByIdAndUpdate(req.session.user_id, {CompanyInfo:newCompany})).populate('CompanyInfo')
    console.log(a);
    res.redirect('/sponsors');
}
module.exports.contact = async function(req,res){
    const {id} = req.params;
    const events = await Events.find({ _id : id});
    const {Email,Contact} = events[0];
    res.render('scontact',{Email,Contact})
}
module.exports.mail = function(req,res){
    req.flash('success', 'Mail sent successfully')
    res.redirect('/sponsors')
}
module.exports.logout = function(req,res){
    req.session.user_id=null;
    res.redirect('/')
}
module.exports.getcart = async function(req,res){
    const findUser = await Sponsor.find({_id :req.session.user_id });
    const currentevents = findUser[0].cart;
    const events = await Events.find({ _id : [...currentevents]});
     //const activeEvents =  Event.find( { _id : { $all: findUser[0].activeEvents } } )
    //console.log(activeEvents);
    res.render('cart',{events});
}
module.exports.addtocart = async function(req, res){
    const {id} = req.params;
    const newEvent = await Events.findById(id);
    const sponsor = await Sponsor.findById(req.session.user_id)
    const company_id = await Company.findById(sponsor.CompanyInfo);  
    await newEvent.InterestedCompanies.push(company_id);
    await newEvent.save();
    console.log(newEvent)
    await Sponsor.findByIdAndUpdate(req.session.user_id, {$push:{cart:newEvent}})
    // const eventManager = Manager.findOne({_id: newEvent.Manager_id})
    // await (await Sponsor.findByIdAndUpdate(req.session.user_id, {$push:{cart:newEvent}}))
    // const eventadded = await Events.findById(req.session.user_id).populate("cart");
    // console.log(eventadded);
    res.redirect('/sponsors/cart')
}
module.exports.deletecart = async function(req, res){
    const {id} = req.params;
    const deleteEvent = await Events.findById(id);
    const sponsor = await Sponsor.findById(req.session.user_id)
    const company_id = await Company.findById(sponsor.CompanyInfo);  
    await deleteEvent.InterestedCompanies.pull(company_id);
    await deleteEvent.save();
    await (await Sponsor.findByIdAndUpdate(req.session.user_id, {$pull:{cart:id}}))
    res.redirect('/sponsors/cart')
}
module.exports.getprofile = async function(req,res){
    const user = await Sponsor.findById(req.session.user_id);
    console.log(user);
    res.render('sprofile',{user})
}
module.exports.profile = function(req,res) {
    const {Name,Email,message} = req.body;
    console.log('Data :',req.body);
    sendMail(Email,Name,message); //to be added
    res.redirect('/sponsors/profile');
    
}
module.exports.about = function(req,res){
    res.render('sabout')
}
