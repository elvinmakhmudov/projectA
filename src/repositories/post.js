const config = require('../../config.json');
import Post from '../models/post';

export default {
    async comment(limit) {
        return new Promise(async function (resolve, reject) {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            let yesterdayInMseconds = Date.now() - d.getTime();
            let posts = await Post.findRandom({
                type: 'comment',
                reviewed: false
            }, {}, {
                limit: limit || config.batchUserLimitCount,
                sort: {
                    rating: -1
                },
                populate: {
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
                }
            }, async function (err, posts) {
                posts = await posts.filter(function (post) {
                    return post.page.length != [] ? true : false;
                });
                resolve(posts);
            });
        });
    },

    async analyze(limit) {
        return new Promise(function (resolve, reject) {
            return Post.findRandom({
                type: 'analyze',
                reviewed: false
            }, {}, {
                limit: limit || config.batchUserLimitCount
            }, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },

    async explore(limit) {
        let posts = await Post.find({
            type: 'analyze',
            reviewed: false
        }).populate({
            path: 'page',
            match: {
                type: 'explore'
            }
        }).sort({
            rating: -1
        });
        posts = await posts.filter(function (post) {
            return post.page.length != [] ? true : false;
        });
        return posts;
    },

    async postsFor(page) {
        return await Post.find({
            reviewed: false,
            username: page.username
        }).sort({
            rating: -1
        });
    },

    async reviewed(limit) {
        return await Post.find({
            reviewed: true
        });
    },

    async remove(post) {
        return await Post.remove({
            url: post.url
        }, function (err) {
            if (err) console.log(err);
        })
    },

    async insertMany(postsArr) {
        return new Promise(async function (resolve, reject) {
            return await Post.collection.insertMany(postsArr, {
                ordered: false
            }, function (err) {
                if (err) return reject(err);
                return resolve();
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
                if (err) return reject(err);
                return resolve();
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
                if (err) return reject(err);
                return resolve();
            });
        });
    },

    async setRating(post, rating) {
        return new Promise(async function (resolve, reject) {
            await Post.update({
                url: post.url
            }, {
                $set: {
                    rating
                }
            }, function (err, post) {
                if (err) return reject(err);
                console.log('Post rating was set to ' + rating);
                resolve();
            });
        });

    }
}