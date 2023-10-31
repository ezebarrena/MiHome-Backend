let instance = null
require('dotenv').config()
const RealEstateService = require('../services/realEstate.service')
const AuthService = require('../services/auth.service')

class RealEstateController {
    static getInstance() {
        if (!instance){
            return new RealEstateController();
        }
        return instance;
    }

    async getRealEstate(req, res) {
        try {
            const realEstates = await RealEstateService.getRealEstate()
            return res.status(200).json({
                message: "Todas las inmobiliarias",
                realEstates: realEstates,
                status: 200,
              });
        }catch (err) {
            console.error(err);
            return res.status(500).json({
            method: "getRealEstate",
            message: err,
        });
        }
    }

    async createRealEstate(req, res) {
        try {
            let newRealEstate = await RealEstateService.postRealEstate(req.body)
            
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
    
    async deleteRealEstate(req, res){
      const logInEmail = req.params.logInEmail;
      try {
        await RealEstateService.deleteRealEstate(logInEmail);

        return res.status(200).json({
            message: "Real Estate deleted correclty",
            status: 200,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({
            method: "deleteRealEstate",
            message: "Server error",
            status: 500,
        });
    }
    }

  

}

module.exports = RealEstateController.getInstance();