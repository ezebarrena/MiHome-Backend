const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    asset:{type: mongoose.Schema.ObjectId, ref: 'Assets'},
    user:{type: mongoose.Schema.ObjectId, ref: 'User'},
    realEstate:{type: mongoose.Schema.ObjectId, ref: 'RealEstate'},
    price:Number, //Mitad del valor de la reserva
    date:String, //Cuando se hace la reserva del alquiler/venta
    dateBooked:String, // fecha desde alquiler
    dateBookedEnd:String, //fecha hasta alquiler
    type:String,
});

const Booking = mongoose.model('Booking',BookingSchema);

module.exports = Booking;