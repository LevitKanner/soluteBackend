const mongoose = require('mongoose')
const createError = require('http-errors')
const error = require('./errors')

const errorHandler = (err, next) => {
    if (err.name === 'MongoError' )  return next(createError.InternalServerError(err.message))

    if (err.name === 'ValidationError') return next(createError.BadRequest(err.message))

    if (err.name === 'ConflictError') return next(createError(400, err.message))

    if (err.name === 'UnauthorizedError') return next(createError.Unauthorized(err.message))

    if (err.message === error.emailInvalid) return next(createError(400, err.message))

    if (err.message === error.duplicateEmail) return next(createError(422, err.message))
}

module.exports = errorHandler