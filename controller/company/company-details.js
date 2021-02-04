module.exports = async (req, res, next) => {
    const {id} = req.params;
    try {
       const company = await _broker.companyService.getCompanyDetails({id}) 
       res.send(company)
    } catch (e) {
        _broker.errorHandler(e, next)
    }
}