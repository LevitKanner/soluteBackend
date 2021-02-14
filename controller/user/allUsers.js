module.exports = async (req, res, next) => {
    const { page = 1, size = 2 } = req.query;

    const limit = parseInt(size)
    const skip = (page - 1) * limit;
    try {
        const users = await _broker.userService.allUsers(skip, limit)
        res.send({
            page: parseInt(page),
            count: limit,
            users
        })
    }catch(e) {
        _broker.utils.errorHandler(e, next)
    }
}