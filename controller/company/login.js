module.exports.controller = async (req, res, next) => {
    try{
        const company = await _broker.companyService.login(req.body)
        res.send(company)
    }catch (e) {
       _broker.utils.errorHandler(e, next)
    }
}
