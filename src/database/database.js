const config = require('../../config.json');
import User from '../models/user';
import Post from '../models/post';
import Page from '../models/page';

// var MongoClient = require('mongodb').MongoClient;
import mongoose from 'mongoose';

export default {
    init() {
        let connect = mongoose.connect(config.mongoDb + config.database);
        connect.then(function (db) {
            this.db = db;
            console.log('Connected to the database');
        }.bind(this));
        return this;
    },

    getUsersToFollow(limit) {
        return User.find({
            type: 'follow',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },

    async getUsersToUnfollow(limit) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        return await User.find({
            type: 'followed',
            reviewed: true,
            followed_at: {
                $lte: yesterdayInMseconds
            }
        }).limit(limit || config.batchUserLimitCount);
    },

    getUsersToLike(limit) {
        return User.find({
            type: 'like',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },

    getUsersToAnalyze(limit) {
        return User.find({
            type: 'analyze',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },

    async getPostsToComment(limit) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        let posts = await Post.find({
            type: 'analyze',
            reviewed: false
        }).populate({
            path: 'page',
            match: {
                $or: [{
                    commented_times: {
                        $lt: config.maxCommentForPageInDay
                    }
                }, {
                    commented_at: {
                        $lt: yesterdayInMseconds
                    }
                }]
            }
        }).sort({
            rating: -1
        }).limit(limit || config.batchUserLimitCount);
        posts = await posts.filter(function (post) {
            return post.page.length != [] ? true : false;
        });
        return posts;
    },

    getPostsToAnalyze(limit) {
        return Post.find({
            type: 'analyze',
            reviewed: false
        }).sort({
            rating: -1
        }).limit(limit || config.batchUserLimitCount);
    },
}