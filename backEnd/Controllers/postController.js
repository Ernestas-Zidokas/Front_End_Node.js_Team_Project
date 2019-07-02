let PostModel = require('../Models/postModel');

let createPost = (request, response) => {
  let data = request.body;
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

let getPostsByCreator = (request, response) => {
  let id = request.params.id;
  PostModel.find({
    creator: id,
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
  PostModel.find(
    {
      _id: id,
    },
    {
      photo: 1,
      likeCount: 1,
      isLiked: {
        $elemMatch: { $eq: request.user._id },
      },
    },
  ).then(items => {
    if (items[0].isLiked.length == 0) {
      PostModel.update(
        {
          _id: id,
          isLiked: { $ne: request.user._id },
        },
        {
          $inc: { likesCount: 1 },
          $push: { isLiked: request.user._id },
        },
      )
        .then(item => {
          response.json(1);
        })
        .catch(e => {
          response.status(400).json(e);
        });
    } else {
      PostModel.update(
        {
          _id: id,
          isLiked: request.user._id,
        },
        {
          $inc: { likesCount: -1 },
          $pull: { isLiked: request.user._id },
        },
      )
        .then(item => {
          response.json(0);
        })
        .catch(e => {
          response.status(400).json(e);
        });
    }
  });
};

let getLikesCountByPostId = (request, response) => {
  let id = request.param('id');
  PostModel.findOne({
    _id: id,
  })
    .then(item => {
      response.json(item.likesCount);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let getLastTenPosts = (request, response) => {
  PostModel.find(
    {},
    {
      photo: 1,
      likesCount: 1,
      commentCount: 1,
      title: 1,
      isLiked: {
        $elemMatch: { $eq: request.user._id },
      },
    },
  )
    .populate('creator')
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
  getLastTenPosts,
  getPostsByCreator,
  setLikesCount,
  getLikesCountByPostId,
};
