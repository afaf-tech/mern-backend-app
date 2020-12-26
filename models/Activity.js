var mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const AcitivitySchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    type: {
        type: String,
        require:true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
    },
    itemId:{
        type:ObjectId,
        ref: 'Item'
    }
})

module.exports = mongoose.model('Activity', AcitivitySchema)