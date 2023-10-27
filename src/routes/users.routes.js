const { Router } = require("express");
const usersController = require("../controllers/users.controller")

const router = Router();


// ARMAR Rutas
router.post("/users/me/", usersController.createUser); //Da de alta un usuario


module.exports = router;