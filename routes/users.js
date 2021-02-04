const express = require('express');
const router = express.Router();

const userLogin = require('../controller/user/login')
const registerUser = require('../controller/user/register')
const getAllUsers = require('../controller/user/allUsers')
const getUserDetails = require('../controller/user/user-details')
const updateUser = require('../controller/user/updateUser')

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
