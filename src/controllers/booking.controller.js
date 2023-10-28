let instance = null;
require('dotenv').config();
const BookingService = require("../services/booking.service");

class BookingController {
    static getInstance() {
        if (!instance) {
            return new BookingController();
        }
        return instance;
    }

    async getBooking(req, res) {
        try {
          const booked = await BookingService.getBooking();
          return res.status(200).json({
            message: "booked sent correctly",
            booked: booked,
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getBooking",
            message: "Server error",
          });
        }
    }

    async postBooking (req, res){
        try {
            let newBooking = await BookingService.postBooking(req.body);
      
            return res.status(200).json({
              message: "Booked published correctly!",
              usuario: newBooking,
              status: 201
            });
          } catch (err) {
            console.error(err);
            return res.status(500).json({
              method: "postBooking",
              message: "Server Error",
              status: 500
            });
          }
    }


}

module.exports = BookingController.getInstance();