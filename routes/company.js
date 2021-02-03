const express = require('express')
const router = express.Router()
const registerCompany = require('../controller/company/register')
const deleteCompany = require('../controller/company/delete')


router.get('/', (req, res) => {
    res.send('Companies')
})

router.post('/register', registerCompany)

router.get('/:id', (req, res, next) => {
    res.send('Get company with id')
})

router.delete('/:id', deleteCompany)

router.patch("/:id", (req, res, next) => {
    res.send('Update company with id')
})


module.exports = router