const router = require('express').Router();
const post = require('../controllers/post.controller.js');

router.post('/post/', post.newPost);
router.put('/post/:id', post.updatePost);

module.exports = router;