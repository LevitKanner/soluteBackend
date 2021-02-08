const createError = require('http-errors')

module.exports = async (req, res, next) => {
    const {id} = req.params;
    try {
        const company = await _broker.companyService.deleteCompany({ id })
        if(!company) return next(createError.NotFound('company not found'))
        res.send(company)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}