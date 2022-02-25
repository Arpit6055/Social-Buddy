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

exports.likePost = async (req,res)=>{
    if(req.body.userId){
        try {
            var a = "Liked";
            var post = await Post.update({_id:req.params.id}, {$addToSet : {likes:`${req.body.userId}`}});
            // if(post.upsertedCount == 0) post = await Post.updateOne({_id:req.params.id},{$pull : {likes:`${req.body.userId}`}}), a = "Unliked";
            console.log(post);
            return res.status(200).json(`${a} the post successfuly`);
        } catch (error) {
            console.log(error);
            return res.status(500).json("error occured");
        }
    }
    res.status(403).json("access denied");

}

module.exports = exports;