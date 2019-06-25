const CommentModel = require('../Models/commentModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


let createComments = (req, res) => {
    let data = req.body
    let comments = new CommentModel()
    comments.text = data.text
    comments.postID = data.postID;
    comments.creator = req.user._id;
    comments.save().then(comentas => 
        res.json(comentas)).catch(e => res.json(e))
}

let getComments = (req, res) => {
  User.find({
      creator: req.user.id
  }, (error, comments) =>{
      if (error){
          res.json(error)
      } else {
          res.json(comments)
      }
  })
}

let getLikes = (req, res) => {
    User.find({
        creator: req.user.id
    }, (error, likes) => {
        if (error){
            res.json(error)
        } else {
            res.json(likes)
        }
    })
}

module.exports = {
    createComments,
    getComments,
    getLikes
}