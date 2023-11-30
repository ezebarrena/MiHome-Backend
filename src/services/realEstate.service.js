const RealEstatesModel = require('../models/RealEstate');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const sendPasswordResetEmail = require ('../utils/sendEmail')
class RealEstatesService {

    async getRealEstate() {
        try {
            const realEstates = await RealEstatesModel.find()
            return realEstates
        }catch (err) {
            console.error(err)
            throw new Error ("Error in getRealEstates Service")
        }
    }

    async getReByEmail (logInEmail){
        try {
            let realEstate = await RealEstatesModel.findOne({logInEmail});
            return realEstate;
          } catch (err) {
            console.error(err);
            throw new Error("Error in getReByEmail Service");
          }
    }
    async getReByID (id){
        console.log(id)
        try {
            let realEstate = await RealEstatesModel.findOne({"_id": new mongoose.Types.ObjectId(id)});
            console.log(realEstate)
            return realEstate;
          } catch (err) {
            console.error(err);
            throw new Error("Error in getReByID Service");
          }
    }

    async postRealEstate(realEstate) {
        try {
            const isRealEstateRegistered = await RealEstatesModel.findOne({
                $or: [
                  { logInEmail: realEstate.logInEmail },
                  { fantasyName: realEstate.fantasyName }
                ]
              });
            if (isRealEstateRegistered) {
                throw new Error ("Real Estate already registered")
            }
            else{
                realEstate.password = bcrypt.hashSync(realEstate.password,process.env.SALT);
                await RealEstatesModel.create(realEstate);
                return realEstate;
            }
        }catch (err) {
            console.error(err);
            throw new Error("Error in createRealEstate Service");
        }
    }

    async deleteRealEstate(reId) {
        try {
            await RealEstatesModel.deleteOne({"_id": new mongoose.Types.ObjectId(reId)});
            
        }catch (err) {
            console.error(err);
            throw new Error("Error in deleteRealEstate Service");
        }
    }
//Enviamos mail con codigo y lo guardamos en el model
    async sendEmailCode(email){
        try{
            console.log(email);
            const realEstate = await RealEstatesModel.findOne({logInEmail: email})
            console.log(realEstate);
            if (realEstate) {
                const codigo = await sendPasswordResetEmail(realEstate.logInEmail)
                await RealEstatesModel.updateOne({logInEmail: realEstate.logInEmail}, {$set: {token: codigo}})
            }
        }catch (err) {
            console.error(err);
            throw new Error("Error in deleteRealEstate Service");
        }
    }

//Validamos token con el llega y con el que esta guardado y blanquea contraseña
    async validateToken(token){
        try{
            const realEstate = await RealEstatesModel.findOne({token: token});
            if (realEstate){
                
                await RealEstatesModel.updateOne({token: realEstate.token}, {$set: {token: 0}})

            } else {
                throw new Error ("token incorrect");
            }
        }catch (err) {
            console.error(err);
            throw new Error("Error in validateToken Service");
        }
    }

    async renewPassword(logInEmail, password){
        try{
            const realEstate = await RealEstatesModel.findOne({logInEmail: logInEmail});
            if (realEstate){
                let newPass = bcrypt.hashSync(password,process.env.SALT);
                await RealEstatesModel.updateOne({logInEmail: realEstate.logInEmail}, {$set: {password: newPass}})
                

            }
        }catch (err) {
            console.error(err);
            throw new Error("Error in validateToken Service");
        }
    }
}

module.exports = new RealEstatesService();