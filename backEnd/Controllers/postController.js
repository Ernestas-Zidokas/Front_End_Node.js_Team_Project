let PostModel = require('../Models/postModel');

let createPost = (request, response) => {
  let data = request.body;
  let post = new PostModel();
  post.title = data.title;
  post.creator = request.user._id;
  post.photo = data.photo;
  post.likes = data.likes;
  post.comments = data.comments;

  post
    .save()
    .then(item => {
      response.json(item);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

//let getPostByCreator = (require, response) => {};



//zygis sita daro
let getLastTenPosts = (request, response) => {
  PostModel.find({
    creator: request.user._id,
  }).then(items => {
    console.log(items)
    response.json(items);
  });
};

// let deleteItem = (req, res) => {
//   let data = req.body;
//   ToDoModel.deleteOne({
//     creator: req.user._id,
//     _id: data._id,
//   })
//     .then(item => {
//       res.json(item);
//     })
//     .catch(e => {
//       res.status(400).json(e);
//     });
// };

// let markAllChecked = (req, res) => {
//   ToDoModel.updateMany(
//     { creator: req.user._id },
//     {
//       checked: true,
//     },
//   ).then(updatedItems => {
//     res.json(updatedItems).catch(e => {
//       res.status(400).json(e);
//     });
//   });
// };

// let deleteItemById = (req, res) => {
//   let id = req.params.id;
//   ToDoModel.deleteOne({
//     _id: id,
//     creator: req.user._id,
//   })
//     .then(response => res.json(response))
//     .catch(e => {
//       res.status(400).json(e);
//     });
// };

// let getItem = (req, res) => {
//   let id = req.param('id');
//   ToDoModel.findOne({
//     _id: id,
//     creator: req.user._id,
//   })
//     .then(item => {
//       res.json(item);
//     })
//     .catch(e => {
//       res.status(400).json(e);
//     });
// };

// let toogleItem = (req, res) => {
//   let id = req.params.id;
//   ToDoModel.findOne({
//     _id: id,
//     creator: req.user._id,
//   })
//     .then(item => {
//       item.checked = !item.checked;
//       item.save().then(savedItem => res.json(savedItem));
//     })
//     .catch(e => {
//       res.status(400).json(e);
//     });
// };

module.exports = {
  createPost,
  //getPostByCreator,
  getLastTenPosts,
  // deleteItem,
  // markAllChecked,
  // deleteItemById,
  // toogleItem,
  // getItem,
};
