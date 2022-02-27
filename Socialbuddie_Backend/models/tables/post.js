const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    max:1000,
  },
  img: {
    type: String,
    default: ""
  },
  likes: {
    type: Array,
    default: []
  },
},
{ 
timestamps : true
}
);

const post = mongoose.model('post', postSchema);

module.exports = post;