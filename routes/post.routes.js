const router = require('express').Router();
const post = require('../controllers/post.controller.js');
//new Post
router.post('/post/', post.newPost);
//update post
router.put('/post/:id', post.updatePost);
//Like post
router.put('/post/:id/like', post.likePost);
//Get post
router.get('/post/:id', post.getPost);

//timeline Post
router.get('/timeline/', post.timelinePost)

module.exports = router;