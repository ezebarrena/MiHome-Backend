require("dotenv").config();
const bcrypt = require("bcrypt");
const RealEstateModel = require("../models/RealEstate");

class AuthService {
  async hasValidCredentials(logInEmail, password) {   ///verificar si login  es con email o con username
    try {
      const hashedPassword = await bcrypt.hash(password, process.env.SALT);
      const realEstate = await RealEstateModel.findOne({ logInEmail });

      if (realEstate && hashedPassword === realEstate.password) {
        return true;
      }
      
      return false;
    } catch (err) {
      console.error(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthService();