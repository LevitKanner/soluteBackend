const mongoose = require('mongoose')
const { VacancySchema } = require('./Vacancy')

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    vacancies: [VacancySchema]
})

module.exports = mongoose.model('company', CompanySchema)