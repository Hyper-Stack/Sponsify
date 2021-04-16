const mongoose = require('mongoose');
const passportlocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;
const managerSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});
managerSchema.plugin(passportlocalMongoose);
module.exports = mongoose.model('Manager', managerSchema)