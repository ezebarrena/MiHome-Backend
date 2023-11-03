const RealEstatesModel = require('../models/RealEstate');
const User = require('../models/User');
const bcrypt = require('bcrypt');

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