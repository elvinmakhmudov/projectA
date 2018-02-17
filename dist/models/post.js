'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var postSchema = new Schema({
    url: {
        type: String,
        unique: true
    },
    username: String,
    reviewed_at: Date,
    //if type is public then you should not get usernames from posts
    type: {
        type: String,
        index: true
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    page: [{
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }],
    likes: Number,
    rating: Number
});

postSchema.plugin(random);

module.exports = mongoose.model('Post', postSchema);;