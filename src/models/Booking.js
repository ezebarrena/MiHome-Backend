const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    asset:[{type: mongoose.Schema.ObjectId, ref: 'Assets'}],
    user:[{type: mongoose.Schema.ObjectId, ref: 'User'}],
    realEstate:[{type: mongoose.Schema.ObjectId, ref: 'RealEstate'}],
    price:Number,
    date:String,
    dateBooked:String,
    dateBookedEnd:String,
    type:String,
});

const Booking = mongoose.model('Booking',UserSchema);

module.exports = Booking;