const User =  require("../models/tables/user.js");
const bcrypt = require('bcrypt');
exports.register = async (req, res)=>{
    try {
        var {name,username,email,password} = req.body;
        //hash password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                var a = {name,username,email,password};
                a.password = hash;
                console.log(a);
                var user = await new User(a);
                await user.save();
                res.send(user);
            });
        });

    } catch (error) {
        console.log(error);
        return res.json({error});
    }
   
}

exports.login = async (req,res)=>{
    var {email,password} = req.body;
    const user = await User.findOne({email});
    var pasRes  = false;
    await bcrypt.compare(password, user.password,async function(err, result) {
       console.log("result", result);
       if(result){
        delete user.password;
        return res.json({user})
        }
        return res.json({error : "password or email dosen't match"});
    });
    

}


module.exports = exports;