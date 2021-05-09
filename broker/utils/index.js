const JWT = require('jsonwebtoken')
const createError = require('http-errors')

const connectDB = require('./database')
const errorHandler = require('./errorHandler')
const errors = require('./errors')
const { hashPassword, validatePasswordHash } = require('./password')
const redisClient = require('./redis')
const sendMail = require('./email')


const generateAccessToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            'expiresIn': '3h',
            'issuer': 'solute.com',
            'audience': id
        }
        JWT.sign(payload, secret, options, (err, result) => {
            if (err) return reject(createError.Unauthorized()) 
            return resolve(result)
        })
    })
}


const generateRefreshToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            'expiresIn': '1y',
            'issuer': 'solute.com',
            'audience': id
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) return reject(createError.Unauthorized())

            redisClient.SET(id, 'Ex', 365 * 24 * 60 * 60, token, (error, reply) => {
                if (error) return reject(createError.InternalServerError())
                return resolve(token)
            })
            
        })
    })
}

const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(createError.Unauthorized())
            
            const id  = payload.aud
            
            redisClient.GET(id, (error, reply) => {
                if (error) return reject(createError.InternalServerError())
                if (reply !== token) return reject(createError.Unauthorized())
                resolve(id)
            }) 
           
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
    generateRefreshToken,
    verifyRefreshToken,
    sendMail
}