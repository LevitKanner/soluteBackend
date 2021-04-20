const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const sendMail = require('../../utils/email') 

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

CompanySchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next()
    } catch (error) {
        next(error)
    }
})

CompanySchema.post('save', async (next) => {
    try {
        await sendMail({
            to: this.email,
            subject: 'Successful Registration',
            body: 'Welcome to solute GH'
        })
        next()
    } catch (error) {
         next(error)
    }
})

module.exports = mongoose.model('company', CompanySchema)