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
  date: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: {
    // reikia schemos id komentarams
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

let postModel = mongoose.model('Posts', PostSchema);

module.exports = postModel;
