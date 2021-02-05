const createError = require('http-errors')

const Company = require('../db/models/Company')
const { hashPassword, validatePasswordHash, errors} = require('../utils')


//Register a Company
module.exports.register = async ({name, email, password, phone}) => {
    const company = await Company.findOne({email})
    if (company) throw createError.Conflict(`${email} already exists`)

    const hashedPassword = await hashPassword(password)
    const newCompany = new Company({
        name,
        email,
        password: hashedPassword,
        phone
    })
    try {
        return await newCompany.save()
    } catch (e) {
        throw e
    }
}

module.exports.login = async ({email, password}) => {
    const company = await Company.findOne({email})
    if (!company) throw createError.BadRequest(`${email} not registered`)

    const isValid = await validatePasswordHash(password, company.password)
    if (!isValid) throw createError.BadRequest(`${password} incorrect`)

    return {
        status: 'success',
        message: 'Login successful',
        payload: {
            ...company
        }
    }
}

module.exports.getCompanyDetails = async ({id}) => {
    try {
        return await Company.findById(id)
    } catch (e) {
        throw e
    }
}

module.exports.deleteCompany = async ({id}) => {
    try {
        return await Company.findByIdAndDelete(id)
    } catch (e) {
        throw e
    }
}


module.exports.allCompanies = async () => {
    try {
        return await Company.find()
    } catch (e) {
        throw e
    }
}

module.exports.updateCompany = async (id, args) => {
    try {
        return await Company.findByIdAndUpdate(id, args, {new: true})
    } catch (e) {
        throw e
    }
}