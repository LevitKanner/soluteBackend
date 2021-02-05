const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
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
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vacancy',
        autopopulate: true
    }]
})

module.exports = mongoose.model('user', UserSchema)