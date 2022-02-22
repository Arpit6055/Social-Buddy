const router = require('express').Router();
const userCont = require('../controllers/user.controller.js')
//get user
router.get('/:id', userCont.getUser);
//update user
router.put('/:id', userCont.updateUser);
//delete user
router.delete('/:id', userCont.deleteUser);
//follow user
router.put('/:id/follow/', userCont.followUser);
//unfollow user
router.put('/:id/unfollow/', userCont.unfollowUser);

module.exports = router;