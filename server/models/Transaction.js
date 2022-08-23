const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    id_origin: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Account'
    },
    id_destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    type: {
        type: String,
        enum: ['DEPOSIT', 'TRANSEFER'],
        require: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)