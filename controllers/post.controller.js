const Post = require('../models/tables/post.js');

exports.newPost = async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(error) {
        res.status(500).json(err);
    }
}

exports.updatePost = async (req,res)=>{
    const post = await Post.findById(req.params.id);
    try {
        if(req.body.userId && req.body.userId==post.userId){
            await Post.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json("Post has been updated");
        }
        res.status(403).json("access denied !!!")
    } catch (error) {
        res.status(500).json(`can't update the post {"error" : ${error}}`)
    }
}

module.exports = exports;