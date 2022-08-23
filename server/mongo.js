const mongoose = require('mongoose')
require('dotenv').config()

const connectionString = process.env.MONGO_DB

mongoose.connect(connectionString)
.then(() => {
    console.log('Connected')
}).catch(e => {
    console.log(e)
})

