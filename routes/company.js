const express = require('express')
const router = express.Router()
const registerCompany = require('../controller/company/register')
const deleteCompany = require('../controller/company/delete')
const getAllCompanies = require('../controller/company/allCompanies')
const getCompanyDetails = require('../controller/company/company-details')


router.get('/', getAllCompanies)

router.post('/register', registerCompany)

router.get('/:id', getCompanyDetails)

router.delete('/:id', deleteCompany)

router.patch("/:id", (req, res, next) => {
    res.send('Update company with id')
})


module.exports = router