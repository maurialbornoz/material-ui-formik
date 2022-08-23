const Account = require('../models/Account')
const User = require('../models/User')
const {validationResult} = require('express-validator')

exports.getAccounts = async(req, res) => {
    let id;
   
    if(!req.query.clientId){
        id=req.user.id
    } else {
        id=req.query.clientId
    }
    // console.log(id)
    
    try {
        const accounts = await Account.find({owner: id})
    
        res.json({accounts})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Error'})
    }
}

exports.getAccountsToDelete = async(req, res) => {

    let threeMonthAgo = new Date();
    threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);

    try {
        // const accounts3Month = await Account.find({"created":{$lt: threeMonthAgo}})
        const accounts = await Account.find({
            $and: [ 
                {"trans_id_destination": { $size: 0 } }, 
                {"trans_id_origin": { $size: 0 } },
                {"created":{$lt: threeMonthAgo}}
            ]
        })
   

        res.json(accounts)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.createAccount = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {accountName, alias, owner} = req.body

    try {
        const accountExists = await Account.findOne({alias})
        console.log(accountExists)
        if(accountExists){
            return res.status(400).json({errors: [{ msg : "The alias is already registered"}]})
        }

        const userExist = await User.find({ _id: owner})
        if (userExist.length === 0) return res.status(404).json({errors: [{ msg : "User not found"}]})
        
        const account = new Account({
            accountName,
            alias,
            owner
        })
        const savedAccount = await account.save()
        res.json(savedAccount)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.deleteAccount = async (req, res) => {
    // console.log(req.params.id)
    try {
        const account = await Account.findById(req.params.id)
        if(!account) return res.status(404).json({msg: 'Cuenta no encontrada'})
        await Account.findByIdAndRemove(req.params.id)
        res.json({msg: 'Cuenta eliminada'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}