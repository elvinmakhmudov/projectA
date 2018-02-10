const config = require('../../config.json');
import Post from '../models/post';

export default {
    async comment(limit) {
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

    async analyze(limit) {
        return await Post.find({
            type: 'analyze',
            reviewed: false
        }).sort({
            rating: -1
        }).limit(limit || config.batchUserLimitCount);
    },

    async reviewed() {
        return await Post.find({
            reviewed: true
        });
    },

    async remove(post) {
        return await Post.remove({
            url: post.url
        }, function (err) {
            if (err) console.log(err);
            console.log('Post was removed');
        })
    },

    async insertMany(postsArr) {
        return new Promise(async function (resolve, reject) {
            return await Post.insertMany(postsArr, function (err) {
                if (err) reject();
                console.log(postsArr.length + ' posts were added');
                resolve();
            });
        });
    },

    async setReviewed(post, postData) {
        return new Promise(async function (resolve, reject) {
            await Post.update({
                url: post.url
            }, {
                $set: {
                    type: 'reviewed',
                    reviewed: true,
                    likes: postData.likes,
                    rating: postData.rating,
                    reviewed_at: Date.now()
                }
            }, function (err, post) {
                if (err) reject();
                console.log('Post was reviewed');
                resolve();
            });
        });
    },

    async setType(post, type) {
        return new Promise(async function (resolve, reject) {
            await Post.update({
                url: post.url
            }, {
                $set: {
                    type,
                    reviewed: true,
                    reviewed_at: Date.now()
                }
            }, function (err, post) {
                if (err) reject();
                console.log('Post was ' + type);
                resolve();
            });
        });
    }
}