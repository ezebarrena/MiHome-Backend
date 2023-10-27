let instance = null;
require('dotenv').config();
const UsersService = require("../services/asset.service");

class AssetController {
    static getInstance() {
        if (!instance) {
            return new UsersController();
        }
        return instance;
    }

    async getAsset(req, res) {
        try {
          const asset = await AssetService.getAsset();
          return res.status(200).json({
            message: "all asset bringed",
            asset: asset,
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getAsset",
            message: "Server error",
          });
        }
    }

    async postAsset (req, res){
        try {
            let newAsset = await UsersService.postAsset(req.body);
      
            return res.status(200).json({
              message: "Asset published correctly!",
              usuario: newAsset,
              status: 201
            });
          } catch (err) {
            console.error(err);
            return res.status(409).json({
              method: "postAsset",
              message: "Asset already existse",
              status: 500
            });
          }
    }

    async deleteAsset(req, res) {
        const assetId = req.params.id; 

        try {
            await AssetService.deleteAsset(assetId);

            return res.status(200).json({
                message: "Asset deleted correclty",
                status: 200,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "deleteAsset",
                message: "Server error",
                status: 500,
            });
        }
    }

    async putAsset(req, res) {
        const assetId = req.params.id; // Obtén el ID del activo de los parámetros de la solicitud
        const updatedData = req.body; // Datos actualizados del activo

        try {           
            const updatedAsset = await AssetService.updateAsset(assetId, updatedData);

            if (!updatedAsset) {
                return res.status(404).json({
                    method: "putAsset",
                    message: "Asset not found",
                    status: 404,
                });
            }

            return res.status(200).json({
                message: "Asset updated correctly",
                asset: updatedAsset,
                status: 200,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "putAsset",
                message: "Server error",
                status: 500,
            });
        }
    }

}

module.exports = AssetController.getInstance();