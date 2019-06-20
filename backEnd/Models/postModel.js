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
    default: new Date(),
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

let postModel = mongoose.model('Posts', PostSchema);

module.exports = postModel;
