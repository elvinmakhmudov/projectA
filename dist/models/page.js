'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var pageSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    reviewed_at: {
        type: Number,
        default: 0
    },
    //if type is public then you should not get usernames from posts
    type: {
        type: String,
        index: true
    },
    commented_times: {
        type: Number,
        default: 0
    },
    commented_at: {
        type: Number,
        default: 0
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    posts: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});

pageSchema.plugin(random);

module.exports = mongoose.model('Page', pageSchema);