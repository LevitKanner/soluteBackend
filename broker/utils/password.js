const bcrypt = require('bcryptjs')

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

module.exports.validatePasswordHash = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}


