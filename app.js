const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors')
require('dotenv').config();

const compression = require('./middlewares/compression')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company')

const app = express();

global._broker = require('./broker')

_broker.utils.connectDB();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Solute API",
            version: "1.0.0",
            description: "Backend Application for Solute"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors())
app.use(compression)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter)

app.use((req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

module.exports = app;
