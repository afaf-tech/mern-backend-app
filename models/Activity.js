var mongoose = require('mongoose');

const AcitivitySchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    type: {
        type: String,
        require:true
    },
    isPopular: {
        type: Boolean,
        required:true
    },
})

module.exports = mongoose.model('Activity', AcitivitySchema)