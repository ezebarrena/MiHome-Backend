const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const { Schema } = mongoose;

const AssetSchema = new mongoose.Schema({
    title:String,
    image:[{imagePath: String}], // Guarda la ruta de la imagen en el sistema de archivos
    type:String,
    transaction:String,
    price:Number,
    coin:String,
    bills:Number,
    description:String,
    amenities:[{String}],
    room:Number,
    floor:Number,
    bath:Number,
    bedroom:Number,
    garage:Number,
    mTotal:Number,
    mIndoor:Number,
    storage:Boolean,
    antiquity:Number,
    streetName:String,
    streetNumber:Number,
    neighbourhood:String,
    locality:String,
    province:String,
    country:String,
    geoLocalization:String,
    frontBack:String,

    status:String, //chequear esto
    realEstateName:{type: mongoose.Schema.ObjectId, ref: 'RealEstate'},
});

const Asset = mongoose.model('Asset',AssetSchema);

module.exports = Asset;