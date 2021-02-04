module.exports = async (req, res, next) => {
    try {
        const result = await _broker.userService.login(req.body)
        res.send(result)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}