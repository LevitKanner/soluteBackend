const Joi = require('joi').extend(require('joi-phone-number'))

module.exports = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(10)
        .phoneNumber({
            defaultCountry: 'GH',
            format: 'e164'
        })
        .required(),
    bio: Joi.string(),
    experience: Joi.number().valid(1, 2, 3).required() 
})