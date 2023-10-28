const mongoose = require('mongoose');
const { Schema } = mongoose;

const RealEstateSchema = new Schema({
    fantasyName:String,
    logInEmail:String,
    contactEmail:String,
    password:String,
    assets:[{type: mongoose.Schema.ObjectId, ref: 'Assets'}],
    rates: [{Number}],
    reviews:[{
        date: Number,
        comment: String
    }]

});

const RealEstate = mongoose.model('RealEstate',RealEstateSchema);

module.exports = RealEstate;