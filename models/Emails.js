var mongoose = require('mongoose');

const EmailsSchema = new mongoose.Schema({
    fromEmail: {
        type: String,
        require:true
    },
    toEmail: {
        type: String,
        require:true
    },
    subject: {
        type: String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Emails', EmailsSchema)