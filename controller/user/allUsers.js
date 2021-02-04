module.exports = async (req, res, next) => {
    try {
        const users = await _broker.userService.allUsers()
        res.send(users)
    }catch(e) {
        _broker.utils.errorHandler(e, next)
    }
}