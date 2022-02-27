const bcrypt = require('bcrypt');
const User =  require("../models/tables/user.js");

const hashPswrd = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password, salt);
    return hash;
}

exports.updateUser = async (req,res)=>{
    if(req.body.userId == req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = await hashPswrd(req.body.password);
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body) ;
            console.log(user);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({error});
        }
    }else{
        res.status(403).json({error : `Access denied !!!`})
    }
};

exports.deleteUser = async (req,res)=>{
    if(req.body.userId == req.params.id || req.user.isAdmin){
        const deletedUser = await User.deleteOne({_id:req.params.id});
        if(deletedUser.deletedCount < 1) return res.status(200).json("No user Found");
        res.status(200).json("deleted user successfuly");
    }else{
        res.status(403).json({error:"acsess denied !!!"})
    }
}

exports.getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        await delete user["password"];
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.followUser = async (req,res)=>{
    if(req.body.userId != req.params.id){
        try {
            await User.updateOne({_id:req.params.id} ,{ $addToSet : {followers: req.body.userId}});
            await User.updateOne({_id:req.body.userId}, {$addToSet : {followings: req.params.id}});
            return res.status(200).json("user followed successfuly");
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    res.status(403).json({error : "you can't follow this user"})

}
exports.unfollowUser = async (req,res)=>{
    if(req.body.userId != req.params.id){
        try {
            var curntUser=await User.findById(req.params.id);
            if(curntUser.following.includes(req.body.userId)){
                await User.findByIdAndUpdate(req.params.id ,{ $pull : {following : req.body.userId}});
                await User.findByIdAndUpdate(req.body.userId, {$pull : {followers : req.params.id}});
                return res.status(200).json("user unfollowed successfuly");
            }
            return res.status(403).json("You don't following this user")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    res.status(403).json({error : "you can't unfollow this user"})

}

exports.userPost = async (req,res)=>{
    
}



module.exports = exports;