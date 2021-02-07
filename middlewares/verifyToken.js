const JWT = require('jsonwebtoken')
const createError = require('http-errors')

const verifyToken = (req, res, next) => {
    if (!req.headers['authorization']) next(createError.unauthorized())

    const [_, token] = req.headers['authorization'].split(' ')
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        err ? next(createError.Unauthorized(err.message)) : req.payload = payload
        next()
    })
}

module.exports = verifyToken