module.exports = async (req, res, next) => {
    try {
        const result = await _broker.validation.user.register.validateAsync(req.body)
        const user = await _broker.userService.register(result)
        res.send(user)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}