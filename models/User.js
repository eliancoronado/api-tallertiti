const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema({
    username: String,
    email: String,
    pass: String,
});

const Usertiti = mongoose.model('Usertiti', userSchema);

module.exports = Usertiti;