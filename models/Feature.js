var mongoose = require('mongoose');

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
})

module.exports = mongoose.model('Feature', FeatureSchema)