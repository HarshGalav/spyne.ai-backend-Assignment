const Discussion = require('../models/discussion.model');

// Create discussion
exports.createDiscussion = async (req, res) => {
  const { text, image, hashtags, author } = req.body;
  try {
    const discussion = new Discussion({ text, image, hashtags, author });
    await discussion.save();
    res.status(201).json({ message: 'Discussion created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all discussions
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('author', 'name');
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update discussion
exports.updateDiscussion = async (req, res) => {
  const { id } = req.params;
  const { text, image, hashtags } = req.body;
  try {
    const discussion = await Discussion.findById(id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    if (text) discussion.text = text;
    if (image) discussion.image = image;
    if (hashtags) discussion.hashtags = hashtags;
    await discussion.save();
    res.json({ message: 'Discussion updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete discussion
exports.deleteDiscussion = async (req, res) => {
  const { id } = req.params;
  try {
    await Discussion.findByIdAndDelete(id);
    res.json({ message: 'Discussion deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get discussions by tags
exports.getDiscussionsByTags = async (req, res) => {
  const { tags } = req.query;
  try {
    const discussions = await Discussion.find({ hashtags: { $in: tags } }).populate('author', 'name');
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get discussions by text
exports.getDiscussionsByText = async (req, res) => {
  const { text } = req.query;
  try {
    const discussions = await Discussion.find({ text: new RegExp(text, 'i') }).populate('author', 'name');
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
