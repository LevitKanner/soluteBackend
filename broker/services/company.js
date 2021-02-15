const createError = require('http-errors')

const Company = require('../db/models/Company')
const {validatePasswordHash, sendMail } = require('../utils')


//Register a Company
module.exports.register = async ({name, email, password, phone}) => {
    const company = await Company.findOne({email})
    if (company) throw createError.Conflict(`email already exists`)

    const newCompany = new Company({
        name,
        email,
        password,
        phone
    })
    
    /**
     * ! To be added as a post save event on company schema.
     */
    sendMail({
        to: email,
        subject: 'Successful Registration',
        body: 'Welcome to solute GH'
    })
        .then(result => console.log(result)).catch(error => console.log(`An error occurred while sending mail ${error.message}`))
    
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
    if (!isValid) throw createError.Unauthorized(`email/password incorrect`)

    const accessToken = await _broker.utils.generateAccessToken(company.id)
    const refreshToken = await _broker.utils.generateRefreshToken(company.id)

    return {
        status: 'success',
        message: 'Login successful',
        tokens: {
            accessToken,
            refreshToken 
        },
        company: {
            ...company.toObject()
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


module.exports.allCompanies = async (skip, limit) => {
    try {
        return await Company.find().skip(skip).limit(limit)
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