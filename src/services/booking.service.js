const BookingModel = require('../models/Booking');

class BookingService{

    async getBooking(){
        try {
            const booking = await BookingModel.find();
            return booking;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getBooking Service");
        }
    }

    async postBooking(booking){
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