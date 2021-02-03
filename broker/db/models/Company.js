const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('company', CompanySchema)