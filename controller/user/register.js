module.exports = async (req, res, next) => {
    try {
        const user = await _broker.userService.register(req.body)
        res.send(user)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}