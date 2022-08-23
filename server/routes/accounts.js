const express = require('express')
const router = express.Router()
const accountController = require('../constrollers/accountController')
const {check} = require('express-validator')
const userExtractor = require('../middleware/auth')

// api/accounts
router.get('/',
    userExtractor,
    accountController.getAccounts
)

router.get('/to_delete',
    userExtractor,
    accountController.getAccountsToDelete
)

router.post('/', 
    userExtractor,
    [
        check('accountName', 'El nombre de la cuenta debe contener por lo menos 5 caracteres alfabéticos').isLength({min: 5}).bail().isAlpha(),
        check('alias', 'El alias debe contener por lo menos 8 caracteres alfabéticos').isLength({min:8}).bail().isAlpha()
    ],
    accountController.createAccount
)

router.delete('/:id',
    userExtractor,
    accountController.deleteAccount
)

module.exports = router