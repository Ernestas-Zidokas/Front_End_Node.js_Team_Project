let PostModel = require('../Models/postModel');

let createPost = (request, response) => {
  let data = request.body;
  console.log(request.file);

  let file = 'http://localhost:3000/' + request.file.path;
  let post = new PostModel();
  post.title = data.title;
  post.creator = request.user._id;
  post.photo = file;
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

let getLastTenPosts = (request, response) => {
  PostModel.find()
    .limit(10)
    .sort({ date: -1 })
    .then(items => {
      response.json(items);
    })
    .catch(error => {
      response.status(400).json(error);
    });
};

module.exports = {
  createPost,
  getPostByCreator,
  getLastTenPosts,
  getPostByCreator,
  setLikesCount,
  getLikesCountByPostId,
};
