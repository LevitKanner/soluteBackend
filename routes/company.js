const express = require('express')
const validator = require('express-joi-validation').createValidator({})
const router = express.Router()

const registerCompany = require('../controller/company/register')
const deleteCompany = require('../controller/company/delete')
const getAllCompanies = require('../controller/company/allCompanies')
const getCompanyDetails = require('../controller/company/company-details')
const updateCompany = require('../controller/company/updateCompany')
const login = require('../controller/company/login')


router.get('/', getAllCompanies)

router.post('/login', login)

router.post('/register', registerCompany)

router.get('/:id', getCompanyDetails)

router.delete('/:id', deleteCompany)

router.patch("/:id", updateCompany)


module.exports = router