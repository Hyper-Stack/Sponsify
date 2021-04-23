const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const event = require('./events');
const company = require('./companies')

const sponsorSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username can't be blank"],
        unique:true
    },
    password:{
        type: String,
        required: [true, "Password can't be blank"],
    },
    email:{
        type: String,
        // required: [true, "Email can't be blank"],
        unique:true
    },
    CompanyInfo :{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'company'
    },
    cart:   [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    ]
})

sponsorSchema.statics.findAndValidate = async function (username, password){
    const foundUser = await this.findOne({username});
    const isvalid = await bcrypt.compare(password, foundUser.password);
    return isvalid ? foundUser : false;
}
sponsorSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    this.password = bcrypt.hash(this.password, 12);
    next();
})
module.exports = mongoose.model('Sponsor', sponsorSchema);
