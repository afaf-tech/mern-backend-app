var mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        require:true
    },
    price: {
        type: Number,
        require:true
    },
    country: {
        type: String,
        default:`Indonesia`
    },
    city: {
        type: String,
        required:true
    },
    isPopular: {
        type: Boolean,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    imageId: [{
        type: String,
        ref:'Image'
    }],
    featureId: [{
        type: String,
        ref:'Feature'
    }],
    activityId: [{
        type: String,
        ref:'Activity'
    }],
})

module.exports = mongoose.model('Item', itemSchema)