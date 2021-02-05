module.exports = async (req, res, next) => {
    try {
        const result = await _broker.validation.company.login.validateAsync(req.body)
        const company = await _broker.companyService.login(result)
        res.send(company)
    }catch (e) {
       _broker.utils.errorHandler(e, next)
    }
}
