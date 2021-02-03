const mongoose = require('mongoose')

const errorHandler = (err, next) => {
    if (err instanceof mongoose.Error.CastError)  return next(err)

    if (err.message === 'validationError') return next(err)

    if (err.message === 'password incorrect') return next(err)

    if (err.message === 'email not registered') return next(err)

    if (err.message === 'email already exist') return next(err)
}

module.exports = errorHandler