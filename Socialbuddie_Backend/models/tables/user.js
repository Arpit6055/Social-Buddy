const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: { type: String, required: false, default: ""},
  cover_pic: { type: String, required: false, default : ""},
  followers : {type:Array, default : []},
  followings : {type:Array, default : []},
  isAdmin : {type:Boolean, default : false},
  description : {type:String, default:"", max:100},
  city : {type:String, default:""},
  
},
{ toJSON: { 
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    return ret;
  }
},
timestamps : true
}
);

const user = mongoose.model('user', UserSchema);

module.exports = user;