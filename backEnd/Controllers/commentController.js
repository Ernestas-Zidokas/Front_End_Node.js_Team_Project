const CommentModel = require('../Models/commentModel');
let PostModel = require('../Models/postModel');

let createComments = (req, res) => {
  let data = req.body;
  let comments = new CommentModel();
  comments.text = data.text;
  comments.postID = data.postID;
  comments.creator = req.user._id;

  comments
    .save()
    .then(comentas => {
      PostModel.findOneAndUpdate(
        { _id: data.postID },
        { $inc: { commentCount: 1 } },
        { new: true },
      ).then(item => {
        res.json(item);
      });
      res.json(comentas);
    })
    .catch(e => res.json(e));
};

let getPostCommentsById = (req, res) => {
  let id = req.params.id;
  CommentModel.find({
    postID: id,
  })
    .populate('creator')
    .then(result => {
      res.json(result);
    })
    .catch(e => res.json(e));
};

module.exports = {
  createComments,
  getPostCommentsById,
};
