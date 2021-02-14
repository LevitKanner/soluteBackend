module.exports = async (req, res, next) => {
    const { page = 1, size = 2 } = req.query;

    const limit = parseInt(size)
    const skip = (page - 1) * limit;
    try {
        const companies = await _broker.companyService.allCompanies(skip,limit)
        res.send({
            page: parseInt(page),
            count: limit,
            companies
        })
    } catch (e) {
        _broker.errorHandler(e, next)
    }
}