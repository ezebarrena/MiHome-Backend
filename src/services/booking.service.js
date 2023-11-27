const { default: mongoose } = require('mongoose');
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

    async getUserBooks(userID){
        try {
            
            const bookings = await BookingModel.find({"user": new mongoose.Types.ObjectId(userID)})
            console.log(bookings);
            return bookings
        } catch (err) {
            console.error(err);
            throw new Error("Error in postBooking Service");
        }
    }

    async getRealEstateBooks(realEstateID){
        try {
            const bookings = await BookingModel.find({"realEstate": new mongoose.Types.ObjectId(realEstateID)})
            return bookings;
        } catch (err) {
            console.error(err);
            throw new Error("Error in postBooking Service");
        }
    }

    async deleteBooking(bookingID){
        try {
            console.log(bookingID);
            await BookingModel.deleteOne({ "_id": new mongoose.Types.ObjectId(bookingID) })
            return bookingID;
        
        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteAsset Service");
        }
    }
}


module.exports = new BookingService();