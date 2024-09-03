const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/:id/follow', userController.followUser);
router.post('/:id/unfollow', userController.unfollowUser);
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id')
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.get('/search', userController.searchUserByName);

module.exports = router;
