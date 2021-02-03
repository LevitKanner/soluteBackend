const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const VacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
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
    }
})

VacancySchema.plugin(autopopulate)
module.exports = mongoose.model('vacancy', VacancySchema)