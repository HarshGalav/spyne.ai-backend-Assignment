const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  discussion: { type: Schema.Types.ObjectId, ref: 'Discussion' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
