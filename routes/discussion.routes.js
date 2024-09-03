const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussion.controller');

router.route('/')
  .get(discussionController.getAllDiscussions)
  .post(discussionController.createDiscussion);

router.route('/:id')
  .put(discussionController.updateDiscussion)
  .delete(discussionController.deleteDiscussion);

router.get('/tags', discussionController.getDiscussionsByTags);
router.get('/search', discussionController.getDiscussionsByText);

module.exports = router;
