const crypto = require('crypto')

const keys = {
    access_secret: crypto.randomBytes(32).toString('hex'),
    refresh_secret: crypto.randomBytes(32).toString('hex')
}

console.table(keys)