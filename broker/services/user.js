const createError = require('http-errors')
const User = require('../db/models/User')


module.exports.login = async ({email, password}) => {
    const user = await User.findOne({email})
    if (!user) throw createError.Unauthorized('email/password invalid')
    const isValid = await _broker.utils.validatePasswordHash(password, user.password)

    if (!isValid) throw createError.Unauthorized('email/password invalid')
    const accessToken = await _broker.utils.generateAccessToken(user.id)
    const refreshToken = await _broker.utils.generateRefreshToken(user.id)
    return {
        status: 'success',
        message: 'login successful',
        payload: {
            tokens: {
                accessToken,
                refreshToken
            },
            user: {
                ...user.toObject() 
            }
        }
    }
}


module.exports.register = async ({name, email, password, phone, experience}) => {
    const user = await User.findOne({
        $or: [{ email }, { phone }]
    })
    if (user) throw createError.Conflict('email/phone already exists')
    const newUser = new User({
        name,
        email,
        password,
        phone,
        experience
    })
    try {
        return await newUser.save()
    } catch (e) {
        throw e
    }
}

module.exports.getUserDetails = async ({id}) => {
    try {
        return await User.findById(id)
    } catch (e) {
        throw e
    }
}

module.exports.allUsers = async (skip, limit) => {
    try {
        return await User.find({}).skip(skip).limit(limit)
    } catch (e) {
        throw e
    }
}

module.exports.updateUser = async (id, args) => {
    try {
        return await User.findByIdAndUpdate(id, args, {new: true})
    } catch (e){
        throw e
    }
}