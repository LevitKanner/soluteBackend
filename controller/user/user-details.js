module.exports = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await _broker.userService.getUserDetails({ id })
        res.send(user)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}