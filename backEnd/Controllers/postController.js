let PostModel = require('../Models/postModel');

let createToDoItem = (request, response) => {
  let data = request.body;
  let toDo = new PostModel();
  toDo.title = data.title;
  toDo.creator = request.user._id;
  toDo
    .save()
    .then(item => {
      response.json(item);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let getAllItems = (request, response) => {
  PostModel.find({
    creator: request.user._id,
  }).then(items => {
    response.json(items);
  });
};

let deleteItem = (req, res) => {
  let data = req.body;
  PostModel.deleteOne({
    creator: req.user._id,
    _id: data._id,
  })
    .then(item => {
      res.json(item);
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

let markAllChecked = (req, res) => {
  PostModel.updateMany(
    { creator: req.user._id },
    {
      checked: true,
    },
  ).then(updatedItems => {
    res.json(updatedItems).catch(e => {
      res.status(400).json(e);
    });
  });
};

let deleteItemById = (req, res) => {
  let id = req.params.id;
  PostModel.deleteOne({
    _id: id,
    creator: req.user._id,
  })
    .then(response => res.json(response))
    .catch(e => {
      res.status(400).json(e);
    });
};

let getItem = (req, res) => {
  let id = req.param('id');
  PostModel.findOne({
    _id: id,
    creator: req.user._id,
  })
    .then(item => {
      res.json(item);
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

let toogleItem = (req, res) => {
  let id = req.params.id;
  PostModel.findOne({
    _id: id,
    creator: req.user._id,
  })
    .then(item => {
      item.checked = !item.checked;
      item.save().then(savedItem => res.json(savedItem));
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

module.exports = {
  createToDoItem,
  getAllItems,
  deleteItem,
  markAllChecked,
  deleteItemById,
  toogleItem,
  getItem,
};
