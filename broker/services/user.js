const User = require('../db/models/User')

module.exports.login = async ({email, password}) => {
    const user = await User.findOne({email})
    if (!user) throw new Error('email not registered')
    const isValid = await _broker.utils.validatePasswordHash(password, user.password)

    if (!isValid) throw new Error('password incorrect')
    return {
        status: 'success',
        message: 'login successful',
        payload: {
            ...user
        }
    }
}


module.exports.register = async ({name, email, password, phone, experience}) => {
    const user = await User.findOne({email})
    if (user) throw new Error('email already exist')
    const hashedPassword = await _broker.utils.hashPassword(password)
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        experience
    })
    try {
        return await newUser.save()
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports.getUserDetails = async ({id}) => {
    try {
        return await User.findById(id)
    } catch (e) {
        throw new Error(e.message)
    }
}