const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next()
    } catch (error) {
        next(error)
    }
})


module.exports = mongoose.model('user', UserSchema)