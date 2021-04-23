const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    FullName: {
        type : String,
        required : true,
    },
    CompanyName: {
        type : String,
        required : true,
    },
    Product: {
        type : String,
        required : true,
    },
    YearOfEstablishment : {
        type : String,
        required : true,
    },
    TargetCustomers : {
        type : String,
        required : true,
    },
    PastSponsorships : {
        type : String,
        required : true,
    },
    EventsWish : {
        type : String,
        required : true,
    },
    PrefferedLocation : {
        type : String,
        required : true,
    },
    Contact : {
        type : String,
        required : true,
    },
    Email : {
        type : String,
        required : true
    },
    Website : {
        type : String,
        // required : true,
    }   
})
module.exports = mongoose.model('Company', companySchema);
