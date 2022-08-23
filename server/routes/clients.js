const express = require('express')
const router = express.Router()
const clientController = require('../constrollers/clientController')
const {check} = require('express-validator')
const userExtractor = require('../middleware/auth')

// api/clients
router.post('/',
    [
        
        check('name', 'El nombre es obligatorio y solo debe contener caracteres alfabéticos').not().isEmpty().bail().isAlpha(),
        // check('name', 'El nombre solo debe contener caracteres alfabéticos').isAlpha(),
        check('surname', 'El apellido es obligatorio y solo debe contener caracteres alfabéticos').not().isEmpty().bail().isAlpha(),
        // check('surname', 'El apellido solo debe contener caracteres alfabéticos').isAlpha(),
        check('username', 'El nombre de usuario debe tener por lo menos 6 caracteres alphanumericos').isLength({min: 6}).bail().isAlphanumeric(),
        check('password', 'La contraseña debe tener por lo menos 6 caracteres, mayúsculas y minúsculas y por lo menos un número o un símbolo').isLength({min: 6}).bail().matches(/^((?=.*\d)|(?=.*[@$!%*#?&]))(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9@$!%*#?&]+$/),
        check('dni','El DNI debe estar compuesto solo por números').isNumeric()
    ],
    clientController.createClient
    )
    
    router.get('/',
    clientController.getClients
    )
    
    router.put('/',
    userExtractor,
    [
        // check('newPassword', 'newPasswordRepeated', 'Ingrese ambas contraseñas').not().isEmpty()
        
        // Check validity
        check('newPassword')
        .custom((newPassword, {req}) => {
            const {newPasswordRepeated} = req.body  
            // console.log(newPassword)
            // console.log(newPasswordRepeated)
            if(newPassword === '' || newPasswordRepeated === '') {
                throw new Error("Ingrese ambas contraseñas");
            } 
            if(newPassword !== newPasswordRepeated){
                throw new Error("Las contraseñas no coinciden")
            }
            else {
                return newPassword;
            }
        }),
        
        check('newPassword', 'La contraseña no es válida').isLength({min: 6}).bail().matches(/^((?=.*\d)|(?=.*[@$!%*#?&]))(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9@$!%*#?&]+$/),
    ],
    clientController.updateClient
    )
    
    module.exports = router