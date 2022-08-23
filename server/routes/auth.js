const express = require('express')
const router = express.Router()
const authController = require('../constrollers/authController')
const {check} = require('express-validator')
const userExtractor = require('../middleware/auth')

router.post('/',
    authController.authenticateUser
)

router.get('/',
    userExtractor,
    authController.authenticatedUser
)

module.exports = router