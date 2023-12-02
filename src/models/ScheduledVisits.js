const mongoose = require('mongoose');

const { Schema } = mongoose

const VisitSchema = new Schema({
    assetId: {type: mongoose.Schema.ObjectId, ref:"Asset"},
    userId: {type: mongoose.Schema.ObjectId, ref:"User"},
    realEstateId: {type: mongoose.Schema.ObjectId, ref:"RealEstate"},
    date: String,
    time: String,
})

const Visit = mongoose.model('Visit', VisitSchema)

module.exports = Visit;