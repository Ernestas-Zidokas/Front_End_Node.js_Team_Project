const mongoose = require('mongoose');

let CommentsSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
});

let CommentModel = mongoose.model('Comment', CommentsSchema);

module.exports = CommentModel;
