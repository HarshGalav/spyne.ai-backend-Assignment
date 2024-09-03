const Comment = require('../models/comment.model');
const Discussion = require('../models/discussion.model');

// Add comment to discussion
exports.addComment = async (req, res) => {
  const { discussionId } = req.params;
  const { text, author } = req.body;
  try {
    const comment = new Comment({ text, author, discussion: discussionId });
    await comment.save();

    const discussion = await Discussion.findById(discussionId);
    discussion.comments.push(comment._id);
    await discussion.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reply to comment
exports.replyToComment = async (req, res) => {
  const { commentId } = req.params;
  const { text, author } = req.body;
  try {
    const comment = new Comment({ text, author });
    await comment.save();

    const parentComment = await Comment.findById(commentId);
    parentComment.replies.push(comment._id);
    await parentComment.save();

    res.status(201).json({ message: 'Reply added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like discussion
exports.likeDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const { userId } = req.body;
  try {
    const discussion = await Discussion.findById(discussionId);
    if (!discussion.likes.includes(userId)) {
      discussion.likes.push(userId);
      await discussion.save();
      res.json({ message: 'Discussion liked successfully' });
    } else {
      res.status(400).json({ message: 'Already liked this discussion' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like comment
exports.likeComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      await comment.save();
      res.json({ message: 'Comment liked successfully' });
    } else {
      res.status(400).json({ message: 'Already liked this comment' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.text = text;
    await comment.save();
    res.json({ message: 'Comment updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
