const mongoose = require('mongoose')

module.exports = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log(`Database connected to ${connection.connection.db.databaseName} on port ${connection.connection.port}`)
    } catch (e) {
        throw new Error(`MONGO_ERROR: ${e.message}`)
    }
}