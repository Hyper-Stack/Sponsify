const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    EventName: {
        type : String,
        required : true,
    },
    Venue : {
        type : String,
        required : true,
    },
    EventDescription : {
        type : String,
        required : true,
    },
    EventType : {
        type : String,
        required : true,
    },
    Website : {
        type : String,
        // required : true,
    },
    Facebook : {
        type : String,
        // required : true,
    },
    Image : {
        url : String,
        filename: String,    // required : true,
    },
    TargetAudience : {
        type : String,
        required : true,
    },
    ExpectedFootfall : {
        type : String,
        required : true,
        min:0
    },
    Email : {
        type : String,
        required : true,
    },
    Contact : {
        type : String,
        required : true,
    }
})
module.exports = mongoose.model('Event', eventSchema);
