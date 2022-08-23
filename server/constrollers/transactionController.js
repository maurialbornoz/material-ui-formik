const Account = require('../models/Account')
const Transaction = require('../models/Transaction')
const {validationResult} = require('express-validator')

exports.getTransactions = async(req, res) => {
    const {accountId} = req.query
    // console.log(accountId)
    try {
       
        const transactions = await Transaction.find({
            $or: [
                {id_origin: accountId },
                {id_destination: accountId }
            ]
        }).populate('id_origin id_destination')
        res.json({transactions})
        // console.log(transactions)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Error'})
    }
}

exports.depositAmount = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {alias, amount} = req.body

    try {
        const aliasExists = await Account.findOne({alias: alias})
        console.log(aliasExists)
        if(!aliasExists) return res.status(400).json({errors: [{ msg : "The alias does not belong to any account"}]})
        // console.log(aliasExists[0]._id)
    
        const transaction = new Transaction({
            id_destination: aliasExists._id,
            type: 'DEPOSIT',
            amount,

        })

        // const account = {balance: aliasExists.balance + Number(amount)}
        // console.log( account)
        const savedTransaction = await transaction.save()
        // const updatedAccount = await Account.findByIdAndUpdate({ _id: aliasExists._id }, { $set : account}, { new: true })
        const account = await Account.findById(aliasExists._id)
        account.balance = account.balance + Number(amount)
        account.trans_id_destination = [...account.trans_id_destination, savedTransaction._id]
        
        await account.save()
        res.json(savedTransaction)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
}

exports.transferAmount = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {accountDestinationAlias, accountOriginAlias, amount} = req.body
    console.log(accountDestinationAlias)
    console.log(accountOriginAlias)
    const userId = req.user.id

    try {
        const accountOrigin = await Account.findOne({alias: accountOriginAlias})
        
        if(!accountOrigin || accountOrigin.owner.toString() !== userId) {
            
            return res.status(400).json({errors: [{ msg : 'You are not the owner of the account'}]})
        } 
        if(accountOrigin.balance < amount) {
            return res.status(400).json({errors: [{msg: `You don't have enough balance. Current balance: $${accountOrigin.balance}` }]})
        }
        const accountDestination = await Account.findOne({alias: accountDestinationAlias})
        
        if(!accountDestination){
            return res.status(400).json({errors: [{msg: 'La cuanta destino no existe'}]})
        } 

        const transaction = new Transaction({
            id_origin : accountOrigin._id,
            id_destination : accountDestination._id,
            type: 'TRANSEFER',
            amount,
        })
    
        const savedTransaction = await transaction.save()
        res.json(savedTransaction)

        accountOrigin.balance = accountOrigin.balance - Number(amount)
        accountDestination.balance = accountDestination.balance + Number(amount)

        await accountOrigin.save()
        await accountDestination.save()
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }

}