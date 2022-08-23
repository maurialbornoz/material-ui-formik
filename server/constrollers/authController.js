const User = require('../models/User')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.authenticateUser = async (req, res) => {
    const {body} = req

    const {username, password} = body
    
    if(!username || !password){
        return res.status(400).json({msg: 'Enter a username and password'})
    } 
    try {
        const user = await User.findOne({username})
        
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'})
        } 
        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword){
            return res.status(400).json({msg: 'Invalid credentials'})
        } 
        const userForToken = {
            id: user._id,
            username: user.name
        }
        const token = jwt.sign(userForToken, process.env.SECRET)

        res.json({
            employee: user.employee,
            passChangePending: user.passChangePending,
            token
        })
   
    
    } catch (error) {
        console.log(error)
    }
}

exports.authenticatedUser = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json({user})
    } catch(error) {
        console.log(error)
        res.status(500).json({msg: 'Error'})
    }
}