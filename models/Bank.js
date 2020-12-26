var mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    nameBank: {
        type: String,
        require:true
    },
    nomorRekening: {
        type: String,
        require:true
    },
    name: {
        type: String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Bank', BankSchema)