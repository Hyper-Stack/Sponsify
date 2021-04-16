const mongoose = require('mongoose');
const passportlocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;
const sponsorSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});
sponsorSchema.plugin(passportlocalMongoose);
module.exports = mongoose.model('Sponsor', sponsorSchema)