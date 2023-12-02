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

  async getAssetById(req, res) {
    try {
      const AssetID = req.body._id;
      const asset = await AssetService.getAssetById(AssetID);
      return res.status(200).json({
        message: "asset by Id bringed",
        asset: asset,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getAssetById",
        message: "Server error",
      });
    }
  }

  async getMyREAsset(req, res) {
    try {
      const realEstateID = req.body.realEstateName;
      const state = req.body.state;
      const transaction = req.body.transaction;
      const asset = await AssetService.getMyREAssets(realEstateID, state, transaction);
      return res.status(200).json({
        message: "your RE assets bringed",
        asset: asset,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getMyREAsset",
        message: "Server error",
      });
    }
  }
  async postAsset(req, res) {
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
        message: err,
        status: 500
      });
    }
  }

  async deleteAsset(req, res) {
    const assetId = req.body.id; //object id? posible cambio

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
    const idAsset = req.params.id; // Obtén el ID del activo de los parámetros de la solicitud
    const updatedData = req.body; // Datos actualizados del activo
    console.log(idAsset);

    try {
      const updatedAsset = await AssetService.updateAsset(idAsset, updatedData);

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

  async getFilteredAssets(req, res) {
    const transaction = req.body.transaction
    const assetType = req.body.assetType
    const coin = req.body.coin
    const nRooms = req.body.nRooms
    const minPrice = req.body.minPrice
    const maxPrice = req.body.maxPrice
    const nBedrooms = req.body.nBedrooms
    const nBaths = req.body.nBaths
    const nGarage = req.body.nGarage
    const mTotal = req.body.mTotal
    const amenities = req.body.amenities
    const year = req.body.year

    console.log(transaction, assetType, coin, nRooms, minPrice)
    try {
      const filteredAssets = await AssetService.filterAssets(transaction, assetType, coin, nRooms, minPrice, maxPrice, nBedrooms, nBaths, nGarage, mTotal, amenities, year)
      console.log(filteredAssets)
      return res.status(200).json({
        message: "Assets brought correctly",
        assets: filteredAssets,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getFilteredAssets",
        message: "Server error",
        status: 500,
      });
    }

  }

}

module.exports = AssetController.getInstance();