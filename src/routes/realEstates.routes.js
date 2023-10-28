const {Router} = require("express");
const realEstateController = require(("../controllers/realEstate.controller"))

const router = Router();

//rutas autenticacion
router.post("/auths", realEstateController.createRealEstate); //autenticacion
router.post("/passwordRecoveries", realEstateController.createRealEstate); //recupero de password
router.post("/resetPassword", realEstateController.createRealEstate); //cambio de password
router.post("/realEstate/me", realEstateController.createRealEstate); 
 
//Usuario de Real Estate
router.get("/realEstate/me", realEstateController.getRealEstate);
router.post("/realEstate/me", realEstateController.createRealEstate);
//router.put("/realEstate/me", realEstateController.putRealEstate);
router.delete("/realEstate/me", realEstateController.deleteRealEstate);

//traer todas las Real Estate
//router.get("/realEstate", realEstateController.getRealEstate);

//valoracion de Real Estate
//router.get("/realEstate/rates", realEstateController.getRate);
//router.put("/realEstate/rates", realEstateController.putRate);
module.exports = router;