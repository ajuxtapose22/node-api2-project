// implement your posts router here
const express = require('express')
const Post = require('./posts-model')

const router = express.Router()


// 1 [GET] /api/posts
router.get('/', (req,res) => {
    Post.find()    
    .then(found => {
            res.status(200).json({
                success: true,
                data: found
            })})
    .catch(err => {
        console.error("Error fetching post:", err)
        res.status(500).json({
            success: false,
            message: "The posts information could not be retrieved"
        }) })})

//2 [GET] /api/posts/:id
router.get('/:id', (req,res) => {
    const { id } = req.params
    Post.findById(id)
    .then(found => {
        if(!id){
            res.status(404).json({
              message: "The post with the specified ID does not exist"
            }) }
            res.status(200).json({
                message: "Successful Post",
                data: found
            })   
        })
    .catch(err => {
        console.log("Error POST", err)
        res.status(500).json({
            success: false,
            message: "The post information could not be retrieved"
        })})})

// 3 [POST] /api/posts
router.post('/', (req,res) => {
    const { title, contents } = req.body
    if(!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post" 
        })
    } else {
        Post.insert({ title, contents })
        .then(({ id }) => {
            return Post.findById(id)
        })
        .then(post => {

            res.status(201).json({ post })
        }
        )
        
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The comments information could not be retrieved" 
            })
        })
    }
})

// 4 [PUT] /api/posts/:id
router.put('/', (req,res) => {

})

// 5 [DELETE] /api/posts/:id
router.delete('/:id', (req,res) => {

})

// 6 [GET] /api/posts/:id/comments
router.get('/:id/comments', (req,res) => {

})


module.exports = router

