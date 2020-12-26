var mongoose = require('mongoose');
const brcypt = require('bcryptjs');
const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },

});


UsersSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password= await brcypt.hash(user.password, 8);
    }
})

module.exports = mongoose.model('Users', UsersSchema)