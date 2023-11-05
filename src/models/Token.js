const mongoose = require('mongoose');
const { Schema } = mongoose;

const TokenSchema = new Schema({
    reId: {type: mongoose.Schema.ObjectId, ref: 'realEstate'},
    token: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }

});

const Token = mongoose.model('Token',TokenSchema);

module.exports = Token;