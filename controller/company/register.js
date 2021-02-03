module.exports = async (req, res, next) => {
    try {
        const newCompany = await _broker.companyService.register(req.body)
        return res.send(newCompany)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}