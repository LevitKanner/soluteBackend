const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    bio: {
        type: String
    },
    experience: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    applications: [require('./Vacancy')]
})

module.exports = mongoose.model('user', UserSchema)