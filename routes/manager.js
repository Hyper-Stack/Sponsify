const express = require('express')
const app = express()
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
const router = express.Router();
const Manager = require('../models/manager')
const { isMLoggedIn, isSLoggedIn, requireSlogin, requireMlogin } = require('../middleware')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const passport = require('passport')
var cookieParser = require('cookie-parser');
const Event = require('../models/events');
const sendMail = require('../controller/mail.js');
const managers = require('../controller/manager')
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

router.get('/register', managers.getRegister)
router.post('/register', managers.registration)
router.post('/login', managers.login)
router.get('/', requireMlogin, managers.home)
router.post('/Edit', managers.edit)
router.get('/event', requireMlogin, managers.getEvent)
router.get('/logout', managers.logout)
router.patch('/EditEvent', managers.editEvent)
router.post('/newEvent',upload.single('Image') ,managers.new)
router.get('/profile', managers.profile)
router.post('/:id/delete', managers.delete)
router.post('/profile', managers.mail)
router.get('/about', managers.about)
module.exports = router;
