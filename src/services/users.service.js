const UsersModel = require('../models/User');
const mongoose = require('mongoose');


class UsersService{

    async getUser() {
        try {
          const users = await UsersModel.find();
          return users;
        } catch (err) {
          console.error(err);
          throw new Error("Error in getUsers Service");
        }
      }

      async createUser(user) {
        try {

          let isUserRegistered = await UsersModel.findOne({email:user.email});
          if(isUserRegistered){
            throw new Error("User already registered");
          }
          else{
            await UsersModel.create(user);
            return user;
        }
        } catch (err) {
          console.error(err);
          throw new Error("Error in createUser Service");
        }
      }

      async favAnAsset(userId, assetId) {
        try {
          console.log("Entro al servicio")
          await UsersModel.updateOne({_id: new mongoose.Types.ObjectId(userId)}, {$push: {favorites: new mongoose.Types.ObjectId(assetId)}})
          console.log(userId + "   " + assetId)
        } catch (err) {
          console.error(err);
            throw new Error("Error in favAnAsset Service");
        }
      }

      
}

module.exports = new UsersService();