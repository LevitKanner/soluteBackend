const JWT = require('jsonwebtoken')
const createError = require('http-errors')

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())

    const [, token] = req.headers['authorization'].split(' ')
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return next(createError.Unauthorized(err.message))
        req.payload = payload
        next()
    })
}

module.exports = verifyAccessToken