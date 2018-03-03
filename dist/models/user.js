'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    reviewed_at: {
        type: Number,
        default: 0
    },
    followed_at: {
        type: Number,
        default: 0
    },
    followed_by: {
        type: String
    },
    //if type is public then you should not get usernames from posts
    type: {
        type: String,
        index: true
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    direct_sent: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(random);

module.exports = mongoose.model('User', userSchema);;