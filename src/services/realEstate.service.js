const RealEstatesModel = require('../models/RealEstate');
const User = require('../models/User');

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

    async postRealEstate(realEstate) {
        try {
            let isRealEstateRegistered = await RealEstatesModel.findOne({logInEmail: realEstate.logInEmail})
            if (isRealEstateRegistered) {
                throw new Error ("Real Estate already registered")
            }
            else{
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