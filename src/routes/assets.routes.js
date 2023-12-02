const { Router } = require ("express")
const assetController = require("../controllers/asset.controller")
const bookingController = require("../controllers/booking.controller")
const visitsController = require("../controllers/visits.controller")

const router = Router()

//Crear asset
router.post("/assets", assetController.postAsset)
router.post("/assets/uploadPic", assetController.uploadAssetPic)

//me trae assets
router.get("/assets", assetController.getAsset)

//Trae todos los assets de una RE
router.post("/myREassets", assetController.getMyREAsset)

//Edita los datos de un asset
router.put("/assets", assetController.putAsset)

//Eliminar una publicacion
router.delete("/assets", assetController.deleteAsset)

//me trae un asset
router.post("/idAssets", assetController.getAssetById)

//Busqueda avanazada
router.post("/assets/filter", assetController.getFilteredAssets)

//Crear una reserva
router.post("/assets/bookings", bookingController.createBooking)
router.delete("/assets/bookings", bookingController.deleteBooking)
//Trae todas las reservas de un usuario
router.post("/assets/bookings/user", bookingController.getMyUserBookings)

//Trae todas las reservas de una inmobiliaria
router.post("/assets/bookings/realEstate", bookingController.getMyREBookings)


//visitas
router.post("/assets/scheduledVisits", visitsController.createVisit)
router.delete("/assets/scheduledVisits", visitsController.deleteVisit)
router.get("/assets/scheduledVisits", visitsController.getVisits)

module.exports = router;