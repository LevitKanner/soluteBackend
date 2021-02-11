const express = require('express')
const router = express.Router()

const registerCompany = require('../controller/company/register')
const deleteCompany = require('../controller/company/delete')
const getAllCompanies = require('../controller/company/allCompanies')
const getCompanyDetails = require('../controller/company/company-details')
const updateCompany = require('../controller/company/updateCompany')
const login = require('../controller/company/login')

/**
 * @swagger
 * components:
 *  schemas:
 *      Company:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *              - phone
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the company
 *              email: 
 *                  type: string
 *                  description: The email of the company
 *              password: 
 *                  type: string
 *                  description: The company password
 *              phone: 
 *                  type: string
 *                  description: The phone number of the company
 *              location:
 *                  type: string
 *                  description: Where the company can be found
 *              description:
 *                  type: string
 *                  description: Information about the company
 *              vacancies: 
 *                  type: array
 *                  items:
 *                      vacancy
 *                  description: Vacant postions available in the company
 */

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: The company managing API routes
 */


/**
 * @swagger 
 * /company:
 *  get:
 *      summary: Retrieves all registered companies
 *      tags: [Company]
 *      responses:
 *          200:
 *              description: The list of all companies
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                           $ref: '#/components/schemas/Company'
 */
router.get('/', getAllCompanies)

/**
 * @swagger
 * /company/login:
 *  post:
 *      summary: Logs a registered company into the application
 *      tags: [Company]
 *      responses:
 *          200:
 *              description: Login successful
 *              content:
 *                  application/json:
 *                   schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: Tell whether login was successful or not
 *                              message:
 *                                  type: string
 *                                  description: Description of the status
 *                              tokens:
 *                                  type: object
 *                                  properties:
 *                                      accessToken:
 *                                          type: string
 *                                          description: Generated access token for authentication
 *                                      refreshToken:
 *                                          type: string
 *                                          description: Generated refresh token to be stored away for when acess token expires
 *                              company:
 *                                  type: object
 *                                  schema:
 *                                      $ref: '#/components/schemas/Company'
 *                      
 */
router.post('/login', login)

/**
 * @swagger
 * /company/register:
 *  post:
 *      summary: Register a company 
 *      tags: [Company]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the company
 *                              required: true
 *                          email:
 *                              type: string
 *                              description: The email of the company
 *                              required: true
 *                          password:
 *                              type: string
 *                              description: The password of the company
 *                              required: true
 *                          phone:
 *                              type: string
 *                              description: The phone number of the company
 *                              required: true
 *      responses:
 *          200:
 *              description: Company registration successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Company'
 *          400:
 *              description: Missing required fields
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      status:
 *                                          type: number
 *                                          description: status code
 *                                      message:
 *                                          type: string
 *                                          description: error message  
 *                                      
 * 
 */
router.post('/register', registerCompany)

/**
 * 
 */
router.get('/:id', getCompanyDetails)

/**
 * 
 */
router.delete('/:id', deleteCompany)

/**
 * 
 */
router.patch("/:id", updateCompany)


module.exports = router