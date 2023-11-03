let instance = null
require('dotenv').config()
const jwt = require("jsonwebtoken");

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
            let isReRegistered = await AuthService.hasValidCredentials(logInEmail, password);
            if (isReRegistered) {
      
              const realEstate = await RealEstateService.getReByEmail(logInEmail);

              const token = jwt.sign(realEstate.toJSON(), process.env.PRIVATE_KEY, {
                expiresIn: "1d",
              });

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

    //chequear esto
    async requestPasswordRecovery(logInEmail) {
      // Generar un token único y establecer la fecha de vencimiento
      const token = generateUniqueToken();
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1); // Expira en 1 hora
  
      // Almacena el token en la base de datos
      await PasswordRecoveryModel.create({ logInEmail, token, expirationDate });
  
      // Envía el token al usuario (por correo electrónico, por ejemplo)
      sendRecoveryTokenByEmail(logInEmail, token);
    }
  
    async verifyPasswordRecoveryToken(logInEmail, token) {
      // Verifica si el token es válido y no ha caducado
      const recoveryData = await PasswordRecoveryModel.findOne({ logInEmail, token });
      if (!recoveryData || recoveryData.expirationDate < new Date()) {
        throw new Error("Invalid or expired recovery token");
      }
    }
  
    async resetPassword(logInEmail, newPassword) {
      // Realiza el cambio de contraseña
      // Asegúrate de que el usuario está verificado antes de realizar el cambio
      await verifyPasswordRecoveryToken(logInEmail, token);
  
      // Cambia la contraseña del usuario
      const hashedPassword = bcrypt.hashSync(newPassword, process.env.SALT);
      await RealEstatesModel.updateOne({ logInEmail }, { password: hashedPassword });
  
      // Elimina el registro de recuperación de contraseña
      await PasswordRecoveryModel.deleteOne({ logInEmail });
    }
  

}

module.exports = RealEstateController.getInstance();