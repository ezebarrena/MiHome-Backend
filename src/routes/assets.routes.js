const { Router } = require ("express")
const assetController = require("../controllers/asset.controller")

const router = Router()

router.post("/assets", assetController.postAsset)
router.get("/assets", assetController.getAsset)
router.post("/myREassets", assetController.getMyREAsset)
router.put("/assets", assetController.putAsset)
router.delete("/assets", assetController.deleteAsset)

module.exports = router;