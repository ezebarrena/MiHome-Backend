const {Router} = require("express");
const realEstateController = require(("../controllers/realEstate.controller"))

const router = Router();

//rutas autenticacion INICIO DE SESION Y LOGIN
router.post("/auths", realEstateController.createRealEstate); //autenticacion
router.post("/auths/login", realEstateController.loginAsRE); //autenticacion
router.delete("/realEstate/me", realEstateController.deleteRealEstate); //Eliminamos realEstate

//RUTAS PARA RECUPERAR CONTRASEÑA
router.post("/resetPassword", realEstateController.sendCode); //solicita cambio y envia codigo
router.post("/resetPassword/validate", realEstateController.validateCode); //validamos codigo
router.post("/resetPassword/renewPassword", realEstateController.renewPassword); //cambiamos password


router.post("/realEstate/id", realEstateController.getReByID);



//traer todas las Real Estate
//router.get("/realEstate", realEstateController.getRealEstate);

//valoracion de Real Estate
router.post("/realEstate/reviews/me", realEstateController.getReviews);
router.post("/realEstate/reviews", realEstateController.postReview);
router.delete("/realEstate/reviews", realEstateController.deleteReview)
module.exports = router;