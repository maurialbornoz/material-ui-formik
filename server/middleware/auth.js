const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authotization = req.get('authorization')
    
    let token = ''
    if(authotization && authotization.toLocaleLowerCase().startsWith('bearer')){
        token = authotization.substring(7)
    }
    let decodedToken = {}

    if(token === 'null' || !token){
        
        return res.status(400).json({
            msg: 'Acceso no autorizado'
        })
    }
    
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        console.log(error)
    }
    
    req.user = decodedToken

    next()
}