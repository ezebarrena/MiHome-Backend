let instance = null;
require('dotenv').config();
const bookingService = require('../services/booking.service');
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

    async createBooking (req, res){
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

    async getMyUserBookings (req, res) {
        try {
          const userID = req.body.userID
          
          const myBookings = await BookingService.getUserBooks(userID);

          return res.status(200).json({
            message: "The user books",
            bookings: myBookings,
            status: 200
          })

        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getMyUserBookings",
            message: "Server error",
          });
        }
    }

    async getMyREBookings (req, res) {
      try {
        const realEstateID = req.body.realEstateID
        
        const myBookings = await BookingService.getRealEstateBooks(realEstateID);

        return res.status(200).json({
          message: "The Real Estate books",
          bookings: myBookings,
          status: 200
        })

      } catch (err) {
        console.error(err);
        return res.status(500).json({
          method: "getMyREBookings",
          message: "Server error",
        });
      }
    }

    async deleteBooking (req, res) {
      const bookingID = req.body.bookingID;

      try {
        await BookingService.deleteBooking(bookingID)

        return res.status(200).json({
          message: "Booking deleted correclty",
          status: 200,
        });
        
      } catch (err) {
        console.error(err);
        return res.status(500).json({
            method: "deleteBooking",
            message: "Server error",
            status: 500,
        });
      }
    }



}

module.exports = BookingController.getInstance();