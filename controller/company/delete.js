module.exports = async (req, res, next) => {
    const {id} = req.params;
    try {
        const company = await _broker.companyService.deleteCompany({id})
        res.send(company)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }

}