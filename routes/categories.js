const router = require('express').Router()
const Category = require('../models/Category')

//Create a category
router.post("/", async (req,res)=>{
    try {
        const newCat = await Category.create(req.body)
        res.status(200).json(newCat)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all categories
router.get("/", async (req,res)=>{
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router