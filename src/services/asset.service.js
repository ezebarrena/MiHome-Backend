const AssetModel = require('../models/Asset');
//const ObjID = require('mongodb/lib/mongodb/bson/bson').ObjectID

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
class AssetService{

    //LO USARIAMOS PARA LA BUSQUEDA AVANZADA
    async getAssets() {
        try {
          const assets = await AssetModel.find({});
          return assets;
        } catch (err) {
          console.error(err);
          throw new Error("Error in getAssets Service");
        }
    }
    
    //GET NEAR ASSETS PARA QUE ME FILTRE SEGUN GEOLOCALIZACION

    //GET FAV ASSETS PARA QUE ME TRAIGA MIS FAVS
    //TODO: Cuando hagamos la parte de usuario
    
    //GET MY RE ASSETS, QUE PUEDA FILTRAR POR STATUS
    async getMyREAssets(realEstateID, state, transaction) {
        try {
            
            if (state !== ""){

                const assets = await AssetModel.find({"realEstateName": new mongoose.Types.ObjectId(realEstateID), "state": state, "transaction":transaction});
                console.log(assets)
                return assets; 
            }else {
                const assets = await AssetModel.find({"realEstateName": new mongoose.Types.ObjectId(realEstateID)});
                return assets;
            }
            
          } catch (err) {
            console.error(err);
            throw new Error("Error in getMyREAssets Service");
          }
    }

    //GET ASSET POR ID 
    async getAssetById(id) {
        try {
            
            if (id !== ""){

                const assets = await AssetModel.find({"_id": new mongoose.Types.ObjectId(id)});
                console.log(assets)
                return assets; 
            }else {
                const assets = await AssetModel.find({"_id": new mongoose.Types.ObjectId(id)});
                return assets;
            }
            
          } catch (err) {
            console.error(err);
            throw new Error("Error in getAssetById Service");
          }
    }


    async postAsset(asset) {
        try {
          
            await AssetModel.create(asset);
            return asset;
        
        } catch (err) {
            console.error(err);
            throw new Error("Error in postAsset Service");
        }
    }

    async updateAsset(asset) {
        try {
          
            await AssetModel.create(asset);
            return asset;
        
        } catch (err) {
            console.error(err);
            throw new Error("Error in updateAsset Service");
        }
    }

    async deleteAsset(asset) {
        try {
          
            await AssetModel.deleteOne({ _id: asset });
            return asset;
        
        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteAsset Service");
        }
    }
    //BUSQUEDA AVANZADA
    async filterAssets(transaction, assetType, coin, nRooms, minPrice, maxPrice, nBedrooms, nBaths, nGarage, mTotal, amenities, year){
        //amenities se tiene que enviar un array, hay que ver como funca
        try {

            await AssetModel.find({
                transaction: transaction,
                type: assetType,
                coin: coin,
                room: nRooms,
                price: {
                    $gte: minPrice,
                    $lte: maxPrice,
                },
                bedrooms: nBedrooms,
                baths: nBaths,
                garage: nGarage,
                antiquity: year,
                mTotal: mTotal,
                amenities: {
                    $in: amenities
                }

            })
        } catch (err) {
            console.error(err);
            throw new Error("Error in filterAssets Service");
        }
    }
}

module.exports = new AssetService();