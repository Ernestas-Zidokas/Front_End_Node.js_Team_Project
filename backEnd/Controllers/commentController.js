const {
    CommentModel 
} = require('../Models/commentsModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
  superSecret
} = require('./../config/config')

let createComments = (req, res) => {
    let data = req.body
    let comments = new Comment()
    comments.text = data.text
    comments.creator = request.user._id;
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