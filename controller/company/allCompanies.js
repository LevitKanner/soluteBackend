module.exports = async (req, res, next) => {
    try {
        const companies = await _broker.companyService.allCompanies()
        res.send(companies)
    } catch (e) {
        _broker.errorHandler(e, next)
    }
}