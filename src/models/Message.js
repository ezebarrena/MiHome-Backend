const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = new Schema({
    userId:{type: mongoose.Schema.ObjectId, ref: 'User'},
    realEstateId:{type: mongoose.Schema.ObjectId, ref: 'RealEstate'},
    subject: String,
    text: String,
})

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message