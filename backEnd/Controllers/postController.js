let PostModel = require('../Models/postModel');

let createPost = (request, response) => {
  let data = request.body;
  let post = new PostModel();
  post.title = data.title;
  post.creator = request.user._id;
  post.photo = data.photo;
  post.likesCount = data.likesCount;

  post
    .save()
    .then(item => {
      response.json(item);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let getPostByCreator = (request, response) => {
  let id = request.param('id');
  PostModel.findOne({
    _id: id,
    creator: request.user._id,
  })
    .then(item => {
      response.json(item);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let setLikesCount = (request, response) => {
  let id = request.params.id;
  PostModel.findOne({
    _id: id,
    creator: request.user._id,
  })
    .then(item => {
      item.likesCount++;
      item.save().then(savedItem => response.json(savedItem));
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let getLikesCountByPostId = (request, response) => {
  let id = request.param('id');
  PostModel.findOne({
    _id: id,
    creator: request.user._id,
  })
    .then(item => {
      response.json(item.likesCount);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

module.exports = {
  createPost,
  getPostByCreator,
  setLikesCount,
  getLikesCountByPostId,
};
