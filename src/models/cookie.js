var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cookieSchema = new Schema({
  username:  String,
  cookies: String
});

module.exports =  mongoose.model('Cookie', cookieSchema);;