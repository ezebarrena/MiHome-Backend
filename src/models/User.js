const mongoose = require('mongoose');


const { Schema } = mongoose;

const UserSchema = new Schema({
    name:String,
    email:String,
    profilePicURL: String,
    paymentMethods:[{
        cardNumber:Number,
        email:String,
        name:String,
        entity:String,
        expiration:Number,
        ccv:Number,
        bank:String,
    }],
    favorites:[{ type: mongoose.Schema.ObjectId, ref:'Asset'}],
    
});

const User = mongoose.model('User',UserSchema);


module.exports = User;