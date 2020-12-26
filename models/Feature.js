var mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const FeatureSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    qty: {
        type: Number,
        require:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    itemId:{
        type:ObjectId,
        ref: 'Item'
    }
})

module.exports = mongoose.model('Feature', FeatureSchema)