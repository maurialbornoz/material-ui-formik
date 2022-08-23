const {Schema, model} = require('mongoose')
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }  ,
    surname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    employee: {
        type: Boolean,
        default: false,
    },
    passChangePending: {
        type: Boolean,
        default: true
    }
})

const User = model('User', userSchema)
module.exports = User