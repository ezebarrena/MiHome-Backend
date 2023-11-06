const RealEstatesModel = require('../models/RealEstate');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
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

    async deleteRealEstate(realEstate) {
        try {
            await RealEstatesModel.deleteOne(realEstate)
            return realEstate;
        }catch (err) {
            console.error(err);
            throw new Error("Error in deleteRealEstate Service");
        }
    }



}

module.exports = new RealEstatesService();