const express = require('express')
const router = express.Router();
const sendMail = require('../controller/mail.js');

router.post("/",(req,res)=>{
    const {Name,email,phone,message} = req.body;
    console.log('Data :',req.body);
    const subject = "Name : " + Name  +"..... Phone : " + phone;
    sendMail(email,subject,message);
    res.redirect('/');

})

module.exports = router;