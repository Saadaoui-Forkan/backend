const express = require('express')

const router = express.Router()
const User = require("../models/users")

// Post: first method
router.post("/add", (req,res) => {
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
router.post("/create", async(req,res) => {
    try {
        data = req.body
        newUser = new User(data)
        savedUser = await newUser.save()
        res.send(savedUser)
    } catch (error) {
        res.send(error)
    }
})

// Get First Method
router.get("/getall", (req,res) => {
    User.find()
        .then(
            users => res.send(users)
        )
        .catch(
            error => res.send(error)
        )
})

// Get Second Method
router.get("/all", async(req,res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

// Get By Id
router.get("/getById/:id", async(req,res) => {
    try {
        const my_id = req.params.id
        const user = await User.findById(my_id)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

// Delete Method Using async await
router.delete("/delete/:id", async(req,res) => {
    try {
        const id = req.params.id
        deleted = await User.findOneAndDelete({_id: id})
        res.send(deleted)
    } catch (error) {
        res.send(error)
    }
})

// Update Method Using async await
router.put("/update/:id", async(req,res) => {
    try {
        const id = req.params.id
        const newUser = req.body
        updated = await User.findOneAndUpdate({_id: id}, newUser)
        res.send(updated)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router