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
        required:true,
        default:false
    },
    description: {
        type: String,
        required:true
    },
    unit:{
        type: String,
        default: 'night'
    },
    sumBooking:{
        type: Number,
        default: 0
    },
    categoryId:{
        type:ObjectId,
        ref: 'Category'
    },
    imageId: [{
        type: ObjectId,
        ref:'Image'
    }],
    featureId: [{
        type: ObjectId,
        ref:'Feature'
    }],
    activityId: [{
        type: ObjectId,
        ref:'Activity'
    }],
})

module.exports = mongoose.model('Item', itemSchema)