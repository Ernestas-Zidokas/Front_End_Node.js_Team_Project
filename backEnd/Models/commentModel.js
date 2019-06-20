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
});

let CommentsModel = mongoose.model('Comments', CommentsSchema);

module.exports = CommentModel;