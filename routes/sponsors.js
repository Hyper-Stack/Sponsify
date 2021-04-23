require('dotenv').config()
const express = require('express')
const router = express.Router();
const Sponsor = require('../models/sponsor')
const {isMLoggedIn, isSLoggedIn ,requireSlogin, requireMlogin,deleteAllCookies} = require('../middleware')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const passport = require('passport')
var cookieParser = require('cookie-parser');
const Events = require('../models/events');
const events = require('../models/events');
const { findById } = require('../models/events');
const sendMail = require('../controller/mail.js');
const sponsors = require('../controller/sponsors')

router.get('/register', sponsors.getRegister)
router.post('/register', sponsors.register)
router.post('/login', sponsors.login)
router.get('/',requireSlogin, sponsors.home)
router.post('/:id/contact',requireSlogin,sponsors.contact)
router.post('MAILTO:sponsify07@gmail.com',requireSlogin,sponsors.mail)
router.get('/logout', sponsors.logout)
router.get('/cart', requireSlogin,sponsors.getcart)
router.post('/:id/addToCart', requireSlogin, sponsors.addtocart)
router.delete('/:id/delete', requireSlogin, sponsors.deletecart)
router.get('/profile',sponsors.getprofile)
router.post('/profile',sponsors.profile)
router.get('/about', sponsors.about)
router.post('/sponsorship',requireSlogin,sponsors.companyAdd);

module.exports = router;
