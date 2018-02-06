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

    async remove(post) {
        return await Post.remove({
            url: post.url
        }, function (err) {
            if (err) console.log(err);
            console.log('Post was removed');
        })
    }
}