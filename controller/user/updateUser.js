module.exports = async (req, res, next) => {
    const {id} = req.params;
    try {
        const updatedUser = await _broker.userService.updateUser(id, req.body)
        res.send(updatedUser)
    } catch (e) {
        _broker.utils.errorHandler(e, next)
    }
}