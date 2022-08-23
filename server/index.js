require('./mongo')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('../client/build'))

app.use('/api/transactions', require('./routes/transactions')) 
app.use('/api/accounts', require('./routes/accounts'))
app.use('/api/clients', require('./routes/clients'))
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app