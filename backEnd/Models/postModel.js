const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  isLiked: [],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

let postModel = mongoose.model('Posts', PostSchema);

module.exports = postModel;
