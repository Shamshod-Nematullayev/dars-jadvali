const mongoose = require('mongoose');

const schema = mongoose.Schema({
    fullname: String,
    phone: String,
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thusday: String,
    Friday: String,
    Saturday: String,
    Sunday: String
})

const User = mongoose.model('user', schema)

module.exports = User