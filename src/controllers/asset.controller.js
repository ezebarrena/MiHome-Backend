let instance = null;
require('dotenv').config();
const AssetService = require("../services/asset.service");

class AssetController {
    static getInstance() {
        if (!instance) {
            return new AssetController();
        }
        return instance;
    }

    async getAsset(req, res) {
        try {
          const asset = await AssetService.getAssets();
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
            let newAsset = await AssetService.postAsset(req.body);
      
            return res.status(200).json({
              message: "Asset published correctly!",
              asset: newAsset,
              status: 201
            });
          } catch (err) {
            console.error(err);
            return res.status(409).json({
              method: "postAsset",
              message: "Asset already exists",
              status: 500
            });
          }
    }

    async deleteAsset(req, res) {
        const assetId = req.params.id; //object id? posible cambio

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
        const assetId = req.params.title; // Obtén el ID del activo de los parámetros de la solicitud
        const updatedData = req.body; // Datos actualizados del activo

        try {           
            const updatedAsset = await AssetService.updateAsset(title, updatedData);

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