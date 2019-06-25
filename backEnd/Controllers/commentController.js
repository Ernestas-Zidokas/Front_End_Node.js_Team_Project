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

let getComments = (req, res) => {
  User.find(
    {
      creator: req.user.id,
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
  getComments,
};
