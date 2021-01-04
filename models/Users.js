var mongoose = require('mongoose');
const brcypt = require('bcryptjs');
const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        require:true
    },
    email: {
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
UsersSchema.path('email').validate(function(value, done) {
    this.model('User').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'Email already exists');

module.exports = mongoose.model('Users', UsersSchema)