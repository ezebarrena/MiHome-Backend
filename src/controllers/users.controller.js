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

    async getUsuarios(req, res) {
        try {
          const users = await UsersService.getUsers();
          return res.status(200).json({
            message: "Todos los usuarios",
            users: users,
            status: 200,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            method: "getUsers",
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
}

module.exports = UsersController.getInstance();