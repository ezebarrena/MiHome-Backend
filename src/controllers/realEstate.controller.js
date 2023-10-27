let instance = null
require('dotenv').config()
const RealEstateService = require('../services/realEstate.service')

class RealEstateController {
    static getInstance() {
        if (!instance){
            return new RealEstateController();
        }
        return instance;
    }

    async getRealEstates(req, res) {
        try {
            const realEstates = await RealEstateService.getRealEstates()
            return res.status(200).json({
                message: "Todas las inmobiliarias",
                realEstates: realEstates,
                status: 200,
              });
        }catch (err) {
            console.error(err);
            return res.status(500).json({
            method: "getRealEstates",
            message: err,
        });
        }
    }

    async postRealEstate(req, res) {
        try {
            let newRealEstate = await RealEstateService.createRealEstate(req.body)
            
            return res.status(201).json({
                message: "Inmobiliaria creada!",
                realEstate: newRealEstate,
                status: 201,
            })

        }catch (err){
            console.error(err);
            return res.status(500).json({
                method: "createRealEstate",
                meesage:"Inmobiliaria existente"
            })
        }
    }

    async loginAsRE(req, res) {
        try {
            const { logInEmail, password } = req.body;
            let isUserRegistered = await AuthService.hasValidCredentials(logInEmail, password);
            if (isUserRegistered) {
      
      
              return res.status(200).json({
                status: 200,
                token,
                message: "Login successful"
              });
      
            } else {
              return res.status(401).json({
                message: "Unauthorized.",
                status: 401
              });
            }
          } catch (err) {
            console.error(err);
            return res.status(500).json({
              method: "login",
              message: err.message,
            });
          }
    }
}

module.exports = RealEstateController.getInstance();