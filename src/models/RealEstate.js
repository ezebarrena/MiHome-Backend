const mongoose = require('mongoose');
const { Schema } = mongoose;

const RealEstateSchema = new Schema({
    fantasyName:String,
    logInEmail:String,
    contactEmail:String,
    password:String,
    assets:[{type: mongoose.Schema.ObjectId, ref: 'Assets'}],
    reviews:[{
        rate: Number,
        comment: String,
        userId: {type: mongoose.Schema.ObjectId, ref: 'User'}
    }],
    token: Number,
    image:{imagePath: String}

});

const RealEstate = mongoose.model('RealEstate',RealEstateSchema);

module.exports = RealEstate;