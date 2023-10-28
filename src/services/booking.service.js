const BookingModel = require('../models/Booking');

class BookingService{

    async getBooking(req,res){
        try {
            const booking = await BookingModel.find();
            return booking;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getBooking Service");
        }
    }

    async postBooking(req,res){
        try {
            await BookingModel.create(booking);
            return booking;
        } catch (err) {
            console.error(err);
            throw new Error("Error in postBooking Service");
        }
    }
}

module.exports = new BookingService();