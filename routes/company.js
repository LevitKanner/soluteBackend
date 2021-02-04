const express = require('express')
const router = express.Router()
const registerCompany = require('../controller/company/register')
const deleteCompany = require('../controller/company/delete')
const getAllCompanies = require('../controller/company/allCompanies')
const getCompanyDetails = require('../controller/company/company-details')
const updateCompany = require('../controller/company/updateCompany')


router.get('/', getAllCompanies)

router.post('/register', registerCompany)

router.get('/:id', getCompanyDetails)

router.delete('/:id', deleteCompany)

router.patch("/:id", updateCompany)


module.exports = router