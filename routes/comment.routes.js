const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/:discussionId/comment', commentController.addComment);
router.post('/:commentId/reply', commentController.replyToComment);
router.post('/:discussionId/like', commentController.likeDiscussion);
router.post('/:commentId/like', commentController.likeComment);

router.route('/:id')
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
