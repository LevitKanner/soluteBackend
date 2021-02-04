const User = require('../db/models/User')
const {errors} = require('../utils')

module.exports.login = async ({email, password}) => {
    const user = await User.findOne({email})
    if (!user) throw new Error(errors.emailInvalid)
    const isValid = await _broker.utils.validatePasswordHash(password, user.password)

    if (!isValid) throw new Error(errors.passwordInvalid)
    return {
        status: 'success',
        message: 'login successful',
        payload: {
            user: {
                ...user.toObject() 
            }
        }
    }
}


module.exports.register = async ({name, email, password, phone, experience}) => {
    const user = await User.findOne({email})
    if (user) throw new Error(errors.duplicateEmail)
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
        console.error(e)
        throw new Error(errors.mongoError)
    }
}

module.exports.getUserDetails = async ({id}) => {
    try {
        return await User.findById(id)
    } catch (e) {
        throw new Error(errors.mongoError)
    }
}

module.exports.allUsers = async () => {
    try {
        return await User.find({})
    } catch (e) {
        throw new Error(error.mongoError)
    }
}

module.exports.updateUser = async (id, args) => {
    try {
        return await User.findByIdAndUpdate(id, args, {new: true})
    } catch (e){
        throw new Error(errors.mongoError)
    }
}