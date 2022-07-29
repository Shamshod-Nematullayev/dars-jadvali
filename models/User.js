const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    phone: String,
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thusday: String,
    Friday: String,
    Saturday: String,
    Sunday: String,
    order: Number
})

const User = mongoose.model('user', schema)

module.exports = User