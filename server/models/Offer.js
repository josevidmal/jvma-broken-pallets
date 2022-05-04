const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const offerSchema = new Schema({
    palletQty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    material: {
        type: String,
        required: true,
    },
    dimension: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Offer = model('Offer', offerSchema);

module.exports = Offer;