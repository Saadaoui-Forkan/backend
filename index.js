const express = require('express')

const userRoute = require('./routes/user')
const productRoute = require('./routes/product')

require('./config/connect')

const app = express()
app.use(express.json())

app.use('/product', productRoute)
app.use('/user', userRoute)

app.use('/get_image', express.static('./uploads'))

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server Is Running On Port ${PORT}`))