const mongoose = require('mongoose')
const createError = require('http-errors')
const error = require('./errors')

const errorHandler = (err, next) => {
    if (err.message === error.mongoError )  return next(createError(404, err.message))

    if (err.name === 'ValidationError') return next(createError(422, 'Validation Error'))

    if (err.message === error.passwordInvalid) return next(createError(422, err.message))

    if (err.message === error.emailInvalid) return next(createError(400, err.message))

    if (err.message === error.duplicateEmail) return next(createError(422, err.message))
}

module.exports = errorHandler