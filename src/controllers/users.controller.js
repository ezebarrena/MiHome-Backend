let instance = null;
require('dotenv').config();
const UsersService = require("../services/users.service");

class UsersController {
  static getInstance() {
    if (!instance) {
      return new UsersController();
    }
    return instance;
  }

  async getUser(req, res) {
    try {
      const users = await UsersService.getUser();
      return res.status(200).json({
        message: "Todos los usuarios",
        users: users,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUser",
        message: err,
      });
    }
  }

  async getUserByID(req, res) {
    try {
      const userID = req.body._id;
      const realEstate = await UsersService.getUserByID(userID)

      return res.status(200).json({
        message: "Traigo user",
        realEstates: realEstate,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUserById",
        message: err,
      });
    }
  }

  async createUser(req, res) {
    try {
      let newUser = await UsersService.createUser(req.body);

      return res.status(201).json({
        message: "Created!",
        usuario: newUser,
        status: 201
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createUser",
        message: "Usuario ya existente",
        status: 500
      });
    }
  }

  async favAnAsset(req, res) {
    try {
      const userId = req.body.userId;
      const assetId = req.body.assetId
      await UsersService.favAnAsset(userId, assetId);

      return res.status(201).json({
        message: "Faveado!",

        status: 201
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "fanAnAsset",
        message: "No se pudo favear",
        status: 500
      });
    }
  }

  async unFavAnAsset(req, res) {
    try {
      const userId = req.body.userId;
      const assetId = req.body.assetId
      await UsersService.unFavAnAsset(userId, assetId);

      return res.status(201).json({
        message: "Desfaveado!",

        status: 201
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "unFavAnAnAsset",
        message: "No se pudo desfavear",
        status: 500
      });
    }
  }

  async getMyFavouriteAssets(req, res) {
    try {
      const userId = req.body.userId;

      const favs = await UsersService.getMyFavoriteAssets(userId)
      console.log(favs)
      return res.status(201).json({
        message: "todos los faveados!",
        favorites: favs,
        status: 201
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getMyFavouriteAssets",
        message: "No se pudo traer los faveados",
        status: 500
      });
    }
  }

  async addPaymentMethod(req, res) {
    try {
      const paymentMethod = req.body.paymentMethod;
      const userId = req.body.userId
      await UsersService.addPaymentMethod(userId, paymentMethod)
      return res.status(201).json({
        message: "payment method added!",
        paymentMethod: paymentMethod,
        status: 201
      });
    } catch (err) {
      return res.status(500).json({
        method: "addPaymentMethod",
        message: "couldnt add payment method :(",
        status: 500
      });

    }
  }

  async deletePaymentMethod(req, res) {
    try {
      const paymentMethod = req.body.paymentMethod;
      const userId = req.body.userId
      await UsersService.deletePaymentMethod(userId, paymentMethod)
      return res.status(201).json({
        message: "payment method deleted!",

        status: 201
      });
    } catch (err) {
      return res.status(500).json({
        method: "deletePaymentMethod",
        message: "couldnt delete payment method :(",
        status: 500
      });

    }
  }
}

module.exports = UsersController.getInstance();