const CommentModel = require('../Models/commentModel');

let createComments = (req, res) => {
  let data = req.body;
  let comments = new CommentModel();
  comments.text = data.text;
  comments.postID = data.postID;
  comments.creator = req.user._id;
  comments
    .save()
    .then(comentas => res.json(comentas))
    .catch(e => res.json(e));
};

let getPostCommentsById = (req, res) => {
    let id = req.params.id;
    CommentModel.find(
    {
     postID: id,
    },
    (error, comments) => {
      if (error) {
        res.json(error);
      } else {
        res.json(comments);
      }
    },
  );
};

module.exports = {
  createComments,
  getPostCommentsById,
};
