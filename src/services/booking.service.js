const { default: mongoose } = require('mongoose');
const BookingModel = require('../models/Booking');
const AssetModel = require('../models/Asset');

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

    async postBooking(booking, assetId){
        try {
            
            await BookingModel.create(booking);
            await AssetModel.updateOne({_id: new mongoose.Types.ObjectId(assetId)}, {sate: 0})
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

    async deleteBooking(bookingID, assetId){
        try {
            console.log(bookingID);
            await BookingModel.deleteOne({ "_id": new mongoose.Types.ObjectId(bookingID) })
            await AssetModel.updateOne({_id: new mongoose.Types.ObjectId(assetId)}, {state: 1})
            return bookingID;
        
        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteAsset Service");
        }
    }
}


module.exports = new BookingService();