const AssetModel = require('../models/Asset');

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
    
    //GET MY RE ASSETS, QUE PUEDA FILTRAR POR STATUS

    async getMyREAssets(realEstateID, state) {
        try {
            console.log("antes del if")
            if (state !== ""){
                console.log("entramos al if")
                console.log(state)
                const assets = await AssetModel.find({"state": state});
                console.log(assets)
                return assets; 
            }else {
                const assets = await AssetModel.find({realEstateName: ObjectId('{realEstateID}')});
                return assets;
            }
            
          } catch (err) {
            console.error(err);
            throw new Error("Error in getMyREAssets Service");
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
          
            await AssetModel.deleteOne(asset);
            return user;
        
        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteAsset Service");
        }
    }

}

module.exports = new AssetService();