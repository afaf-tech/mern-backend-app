var mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require:true
    },
    lastName: {
        type: String,
        require:true
    },
    email: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: String,
        required:true
    },
})

module.exports = mongoose.model('Member', MemberSchema)