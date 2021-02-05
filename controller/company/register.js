const Joi = require('joi').extend(require('joi-phone-number'))

module.exports = async (req, res, next) => {
    try {
        const result = await _broker.validation.company.register.validateAsync(req.body)
        const newCompany = await _broker.companyService.register(result)
        return res.send(newCompany)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}
