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
  date: {
    type: Date,
    default: Date.now
  }, 
  profile_pic: { type: String, required: false, default: ""},
  cover_pic: { type: String, required: false, default : ""},
  followers : {type:Array, default : []},
  following : {type:Array, default : []},
  isAdmin : {type:Boolean, default : false}
},
{
    timestamps : true,
}
);

const user = mongoose.model('user', UserSchema);

module.exports = user;