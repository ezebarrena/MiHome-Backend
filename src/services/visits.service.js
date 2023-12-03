const VisitModel = require("../models/ScheduledVisits")
const mongoose = require("mongoose")

class VisitsService {
    async createVisit (visit) {
        try {
            await VisitModel.create(visit);
            return visit;

          } catch (err) {
            console.error(err);
            throw new Error("Error in createVisit Service");
          }
    }

    async deleteVisit (visitId) {
      try {
        
        await VisitModel.deleteOne({_id: new mongoose.Types.ObjectId(visitId)});
        
      } catch (err) {
        console.error(err);
        throw new Error("Error in deleteVisit Service");
      }
    }

    async getVisits () {
      try {
        
        const visits = await VisitModel.find();
        return visits
      } catch (err) {
        console.error(err);
        throw new Error("Error in getVisits Service");
      }
    }

}

module.exports = new VisitsService()