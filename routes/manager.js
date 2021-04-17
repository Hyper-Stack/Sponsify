const express = require('express')
const router = express.Router();
const Manager = require('../models/manager')
const {isMLoggedIn, isSLoggedIn ,requireSlogin, requireMlogin} = require('../middleware')
const bcrypt = require('bcrypt')

const passport = require('passport')


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
module.exports = router;