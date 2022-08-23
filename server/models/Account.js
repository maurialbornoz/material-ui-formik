const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    accountName: {
        type: String,
        required: true,
        trim: true
    },
    alias: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    balance: {
        type: Number,
        default: 0
    },
    trans_id_origin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    trans_id_destination: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
})

module.exports = mongoose.model('Account', accountSchema)