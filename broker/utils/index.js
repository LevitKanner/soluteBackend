const JWT = require('jsonwebtoken')
const createError = require('http-errors')

const connectDB = require('./database')
const errorHandler = require('./errorHandler')
const errors = require('./errors')
const { hashPassword, validatePasswordHash } = require('./password')

const generateAccessToken = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.ACCESS_TOKEN_SECRET
        options = {
            'expiresIn': '20s',
            'issuer': 'solute.com',
            'audience': id
        }
        JWT.sign(payload, secret, options, (err, payload) => {
            if (err) return reject(createError.Unauthorized()) 
            return resolve(payload)
        })
    })
}

const generateRefreshToken = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.REFRESH_TOKEN_SECRET
        options = {
            'expiresIn': '1y',
            'issuer': 'solute.com',
            'audience': id
        }
        JWT.sign(payload, secret, options, (err, payload) => {
            if (err) return reject(createError.Unauthorized()) 
            return resolve(payload)
        })
    })
}


module.exports = {
    connectDB,
    hashPassword,
    validatePasswordHash,
    errorHandler, 
    errors,
    generateAccessToken,
    generateRefreshToken
}