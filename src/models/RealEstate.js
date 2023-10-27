const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fantasyName:String,
    logInEmail:String,
    contactEmail:String,
    password:String,
    assets:[{type: mongoose.Schema.ObjectId, ref: 'Assets'}],

});

const User = mongoose.model('User',UserSchema);

module.exports = User;