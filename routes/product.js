const express = require('express')

const router = express.Router()
const Product = require("../models/product")

const multer = require('multer')

filename = '';

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let fl = date + '.' +file.mimetype.split('/')[1];
        redirect(null, fl);
        filename= fl;
    }
})

const upload = multer({storage: mystorage})

// Post Method
router.post("/create_product", upload.any('image'), async(req,res) => {
    try {
        data = req.body
        const newProduct = new Product(data)
        newProduct.image = filename
        savedProduct = await newProduct.save()
        filename = ''
        res.status(200).send(savedProduct)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get Method
router.get("/products", async(req,res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get By Id 
router.get("/getProductById/:id", async(req,res) => {
    try {
        const my_id = req.params.id
        const product = await Product.findById(my_id)
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Put Method
router.put("/update_product/:id", async(req,res) => {
    try {
        const id = req.params.id
        const product = req.body
        updated = await Product.findOneAndUpdate({_id: id}, product)
        res.status(200).send(updated)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete Method
router.delete("/delete_product/:id", async(req,res) => {
    try {
        const id = req.params.id
        deleted = await Product.findOneAndDelete({_id: id})
        res.status(200).send(deleted)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router