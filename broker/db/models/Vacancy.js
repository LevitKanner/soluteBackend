const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const VacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true,
        autopopulate: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    requirements: {
        type: String,
        required: true
    },
    compensation: Number,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            autopopulate: true
        }
    ]
})

VacancySchema.plugin(autopopulate)

module.exports.Vacancy = mongoose.model('vacancy', VacancySchema)
module.exports.VacancySchema = VacancySchema