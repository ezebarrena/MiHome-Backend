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

    async createUser (req, res){
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

    async favAnAsset (req, res){
      try {
        console.log("entro al controlador");
        const userId = req.body.userId;
        const assetId = req.body.assetId
        console.log(userId + "    " + assetId)
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

}

module.exports = UsersController.getInstance();