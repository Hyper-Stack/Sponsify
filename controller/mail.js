const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.API_KEY ||  '516c8eca8f8ed9c9fd72f112e88803a3-71b35d7e-4458a405', // TODO: Replace with your mailgun API KEY
        domain: process.env.DOMAIN || 'sandboxdb93d123b7144848afb7d665f0f14d12.mailgun.org' // TODO: Replace with your mailgun DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, subject, text) => {
    const mailOptions = {
        from: email, 
        to: "as77jadoun@gmail.com", 
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("ERROR!! :" ,err);
        }else{
            console.log("Message sent!!!");
        }
        
    });
}

module.exports = sendMail;