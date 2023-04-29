const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

//Create Post
router.post("/", async(req,res)=>{
    try {
        const newPost = await Post.create(req.body)
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

//Update a post
router.put("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        }else{
            res.status(401).json("you can update only your posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete a Post
router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("Post has been deleted...")
            } catch (error) {
                res.status(500).json(error)
            }
        }else{
            res.status(401).json("you can delete only your posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get one post
router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get All Posts
router.get("/", async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories: {
                $in:[catName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router