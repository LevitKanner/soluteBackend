module.exports = async (req, res, next) => {
    try {
        const result = await _broker.validation.user.login.validateAsync(req.body)
        const user = await _broker.userService.login(result)
        res.send(user)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}