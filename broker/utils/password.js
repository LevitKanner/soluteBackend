const bcrypt = require('bcryptjs')

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch (e) {
        throw e
    }
}

module.exports.validatePasswordHash = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (e) {
        throw e
    }
}


