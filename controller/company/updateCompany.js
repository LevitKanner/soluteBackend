module.exports = async (req, res, next) => {
    const {id} = req.params;
    try {
        const updatedCompany = await _broker.companyService.updateCompany(id, req.body)
        res.send(updatedCompany)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}