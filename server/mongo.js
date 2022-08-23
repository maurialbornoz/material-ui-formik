const mongoose = require('mongoose')


const connectionString = 'mongodb+srv://mauri300:pDXnXgQ7ujM9l7pT@cluster0.9m3p0.mongodb.net/app-homebanking?retryWrites=true&w=majority'

mongoose.connect(connectionString)
.then(() => {
    console.log('Connected')
}).catch(e => {
    console.log(e)
})

