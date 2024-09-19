const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const solicitudSchema = new Schema({
    tipo: String,
    placa: String,
    situation: String,
    address: String,
    time: String,
})
const Delivery = mongoose.model('Delivery', solicitudSchema);

module.exports = Delivery;