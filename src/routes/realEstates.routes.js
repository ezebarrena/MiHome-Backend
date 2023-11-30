const {Router} = require("express");
const realEstateController = require(("../controllers/realEstate.controller"))

const router = Router();

//rutas autenticacion INICIO DE SESION Y LOGIN
router.post("/auths", realEstateController.createRealEstate); //autenticacion
router.post("/auths/login", realEstateController.loginAsRE); //autenticacion

//RUTAS PARA RECUPERAR CONTRASEÑA
//router.post("/passwordRecoveries", realEstateController.passwordRecover); //recupero de password
router.post("/resetPassword", realEstateController.sendCode); //cambio de password
router.post("/resetPassword/validate", realEstateController.validateCode);
router.post("/resetPassword/renewPassword", realEstateController.renewPassword);


router.post("/realEstate/id", realEstateController.getReByID);

router.post("/realEstate/me", realEstateController.createRealEstate);
//router.put("/realEstate/me", realEstateController.putRealEstate);
router.delete("/realEstate/me", realEstateController.deleteRealEstate);


//traer todas las Real Estate
//router.get("/realEstate", realEstateController.getRealEstate);

//valoracion de Real Estate
//router.get("/realEstate/rates", realEstateController.getRate);
//router.put("/realEstate/rates", realEstateController.putRate);
module.exports = router;