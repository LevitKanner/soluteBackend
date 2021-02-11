const express = require('express');
const router = express.Router();

const userLogin = require('../controller/user/login')
const registerUser = require('../controller/user/register')
const getAllUsers = require('../controller/user/allUsers')
const getUserDetails = require('../controller/user/user-details')
const updateUser = require('../controller/user/updateUser')

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *              - phone
 *              - experience
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the user
 *              email: 
 *                  type: string
 *                  description: The email of the user
 *              password: 
 *                  type: string
 *                  description: The user password
 *              phone: 
 *                  type: string
 *                  description: The phone number of the user
 *              bio:
 *                  type: string
 *                  description: Information about the user
 *              experience: 
 *                  type: number
 *                  description: Experience level of the user 1-junior, 2-mid level, 3-senior
 *              applications: 
 *                  type: Array
 *                  description: vacancies applied to by the user
 */


//Get all users
router.get('/', getAllUsers)

//Register a new user
router.post('/register', registerUser);

/* Login a user */
router.post('/login', userLogin);

//Get user details
router.get('/:id', getUserDetails)

//Update a user 
router.patch('/:id', updateUser);

module.exports = router;
