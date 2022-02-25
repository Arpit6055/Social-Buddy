const router = require('express').Router();
const post = require('../controllers/post.controller.js');
//new Post
router.post('/post/', post.newPost);
//update post
router.put('/post/:id', post.updatePost);
//Like post
router.put('/:id/like', post.likePost);

module.exports = router;