const express = require('express')
const router = express.Router()
const transactionController = require('../constrollers/transactionController')
const userExtractor = require('../middleware/auth')
const {check} = require('express-validator')

// api/transactions

router.post('/deposit',
    userExtractor,
    [
        check('alias', 'Ingrese un alias válido').not().isEmpty().bail().isLength({min:8}).bail().isAlpha(),
        check('amount', 'El monto debe ser mayor a cero').not().isEmpty().bail().isInt({min:0})
    ],
    transactionController.depositAmount
)

router.post('/',
    userExtractor,
    [
        check('accountOriginAlias', 'Ingrese el alias de la cuenta origen').not().isEmpty().bail().isLength({min:8}).bail().isAlpha(),
        check('accountDestinationAlias', 'Ingrese el alias de la cuenta destino').not().isEmpty().bail().isLength({min:8}).bail().isAlpha(),
        check('amount', 'El monto debe ser mayor a cero').not().isEmpty().bail().isInt({min:0})
    ],
    transactionController.transferAmount
)
router.get('/',
    userExtractor,
    transactionController.getTransactions
)
module.exports = router