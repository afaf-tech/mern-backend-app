var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema;
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    itemId :[{
        type: ObjectId,
        ref:'Item'
    }]
})

module.exports = mongoose.model('Category', categorySchema)