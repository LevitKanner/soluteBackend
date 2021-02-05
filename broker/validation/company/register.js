const Joi = require('joi').extend(require('joi-phone-number'))

module.exports = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().phoneNumber({
        defaultCountry: 'GH',
        format: 'e164'
    }),
    location: Joi.string(),
    description: Joi.string()
})