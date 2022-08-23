const User = require('../models/User')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

exports.getClients = async(req, res) => {
    try {
        const clients = await User.find({employee: false}).select('-password')
        res.json({clients})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}
exports.createClient = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, surname, username, password, dni} = req.body

    try {
        const usernameExists = await User.findOne({username})
        console.log(usernameExists)
        if(usernameExists){
            return res.status(400).json({errors: [{ msg : "The username is already registered"}]})
        }
        const dniExists = await User.findOne({dni})
        if(dniExists){
            return res.status(400).json({errors: [{ msg : "The DNI is already registered"}]})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const client = new User({
            name,
            surname,
            username,
            password: passwordHash,
            dni,
            employee: false,
            passChangePending: true
        })

        const savedClient = await client.save()
        res.json(savedClient)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.updateClient = async (req, res) => {
    // console.log(req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array({ onlyFirstError: true })})
    }
    // console.log(req.user.id)
    const {newPassword} = req.body
    const userId = req.user.id
    try {
        const passwordHash = await bcrypt.hash(newPassword, 10)
        const updatedUser = await User.findByIdAndUpdate(userId, {
            password: passwordHash,
            passChangePending: false
        }, {new: true})
        await updatedUser.save()
        // console.log(updatedUser)
        res.json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}