const Post = require('../models/tables/post.js');
const User = require('../models/tables/user.js');

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
            var post = await Post.findById(req.params.id);
            if(post.likes.includes(req.body.userId))  post = await Post.updateOne({_id:req.params.id}, {$pull : {likes:`${req.body.userId}`}}), a ="Unliked"
            else  post = await Post.updateOne({_id:req.params.id}, {$addToSet : {likes:`${req.body.userId}`}});
            console.log(post);
            return res.status(200).json(`${a} the post successfuly`);
        } catch (error) {
            console.log(error);
            return res.status(500).json("error occured");
        }
    }
    res.status(403).json("access denied");
}

exports.getPost = async(req,res)=>{
    try {
        var post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(403).json({error});
    }
}

exports.timelinePost = async(req,res)=>{
    let post = [];
    try {
        const curnTuser = await User.findById(req.body.userId);
        const userPost = await Post.find({userId:req.body.userId});
        console.log("userpost are", userPost)
        const frndPost = await Promise.all(
            curnTuser.followings.map(async(elm)=>{
               var a = await Post.find({userId:elm});
               console.log(a);
               return a;
            })
        );
        console.log("frndspost are", frndPost);
        res.status(200).json(userPost.concat(...frndPost))
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = exports;