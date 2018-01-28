'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  url: { type: String, unique: true },
  username: String,
  reviewed_at: Date,
  //if type is public then you should not get usernames from posts
  type: { type: String, index: true },
  reviewed: { type: Boolean, default: false },
  likes: Number,
  rating: Number
});

module.exports = mongoose.model('Post', postSchema);;