const UsersModel = require('../models/User');
const AssetModel = require('../models/Asset')
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

      async unFavAnAsset(userId, assetId) {
        try {
          await UsersModel.updateOne({_id: new mongoose.Types.ObjectId(userId)}, {$pull: {favorites: new mongoose.Types.ObjectId(assetId)}})
        } catch (err) {
          console.error(err);
          throw new Error("Error in unFavAnAsset Service");
        }
      }

      async getMyFavoriteAssets(userId) {
        try {

          const user = await UsersModel.findById(userId)

          if (!user) {
            console.log('User not found');
            return null;
          }

          const favoriteAssetIds = user.favorites

          console.log(favoriteAssetIds)


          if (favoriteAssetIds.length === 0) {
            console.log('El usuario no tiene propiedades faveadas');
            return []; // Devuelve un array vacío si el usuario no tiene props faveadas
          }

          const favoriteAssets = await AssetModel.find({ _id: { $in: favoriteAssetIds } });
          return favoriteAssets
        } catch (err) {
          console.error(err);
          throw new Error("Error in getMyFavoriteAssets Service");
        }
      }
      
}

module.exports = new UsersService();