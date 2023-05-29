const express = require('express')
require('./config/connect')
const User = require("./models/users")
const app = express()
app.use(express.json())

// Post: first method
app.post("/add", (req,res) => {
    data = req.body
    newUser = new User(data)
    newUser.save()
        .then(
            (savedUser) => {
                res.send(savedUser)
            }
        )
        .catch(
            (error) => {
                res.send(error)
            }
        )
})

// Post: second method
app.post("/create", async(req,res) => {
    try {
        data = req.body
        newUser = new User(data)
        savedUser = await newUser.save()
        res.send(savedUser)
    } catch (error) {
        res.send(error)
    }
})

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server Is Running On Port ${PORT}`))