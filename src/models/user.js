var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  { type: String, unique: true },
  reviewed_at: { type: Number, default: 0 },
  //if type is public then you should not get usernames from posts
  type: { type: String, index: true },
  reviewed: {type:Boolean, default: false},
});

module.exports =  mongoose.model('User', userSchema);;