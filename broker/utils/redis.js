const redis = require('redis')

const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: '127.0.0.1'
})

client.on('connected', () => {
    console.log('Redis client connected')
})

client.on('ready', () => {
    console.log('Redis client connected and ready...')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Closing redis')
})

process.on('SIGINT', () => {
    client.end()
})

module.exports = client