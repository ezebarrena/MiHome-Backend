const { Router } = require("express");
const usersController = require("../controllers/users.controller")

const router = Router();


// ARMAR Rutas
router.post("/users/me/", usersController.createUser); //Da de alta un usuario
router.get("/users/me/", usersController.getUser); //Me trae los usuarios
//router.put("/users/me/", usersController.putUser); 

router.post("/users/me/favorite", usersController.favAnAsset)
router.post("/users/me/unfavorite", usersController.unFavAnAsset)
router.get("/users/me/favorite", usersController.getMyFavouriteAssets)

module.exports = router;