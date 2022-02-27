const User =  require("../models/tables/user.js");
const bcrypt = require('bcrypt');
const hashPswrd = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password, salt);
    return hash;
}
exports.register = async (req, res)=>{
    try {
        var {password} = req.body;
        req.body.password = await hashPswrd(password);
        var user = await new User(req.body);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
   
}

exports.login = async (req,res)=>{
    try {
        var {email,password} = req.body;
        const user = await User.findOne({email});
        bcrypt.compare(password, user.password,async function(err, result) {
           console.log("result", result);
           if(result){
            delete user.password;
            return res.status(200).json({user})
            }
            return res.status(400).json({error : "password or email dosen't match"});
        });
    } catch (error) {
        res.status(500).json({error});
    }

}


module.exports = exports;