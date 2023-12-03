let instance = null

const VisitsService = require("../services/visits.service")

class VisitsController {
    static getInstance() {
        if (!instance) {
            return new VisitsController()
        }
        return instance
    }
    async createVisit(req, res) {
        try {

            const visit = await VisitsService.createVisit(req.body)

            return res.status(200).json({
                message: "Visita creada",
                visit: visit,
                status: 200
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
              method: "createVisit",
              message: err,
            });
        }
    }

    async deleteVisit (req, res){
        try {
            const visit = await VisitsService.deleteVisit(req.body.visitId)

            return res.status(200).json({
                message: "Visita eliminada",
                visit: visit,
                status: 200
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
              method: "deleteVisit",
              message: err,
            });
        }
    }

    async getVisits (req, res){
        try {
            const visit = await VisitsService.getVisits()

            return res.status(200).json({
                message: "Todas las visitas",
                visit: visit,
                status: 200
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
              method: "getVisits",
              message: err,
            });
        }
    }
}

module.exports = VisitsController.getInstance()