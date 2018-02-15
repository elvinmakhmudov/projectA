const config = require('../../config.json');
import Page from '../models/page';

export default {
    remove(page) {
        return new Promise(async function (resolve, reject) {
            await Page.remove({
                username: page.username
            }, function (err) {
                if (err) reject();
                console.log(page.username + ' was removed.');
                resolve();
            });
        });
    },

    async private(limit) {
        var d = new Date();
        d.setDate(d.getDate() - config.oldestPageInDays);
        let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        return Page.find({
            reviewed: false,
            reviewed_at: {
                $lt: yesterdayInMseconds
            },
            type: 'private'
        }).limit(limit || config.batchUserLimitCount);
    },

    async explore(limit) {
        var d = new Date();
        d.setDate(d.getDate() - config.oldestPageInDays);
        let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        return Page.find({
            reviewed: false,
            type: 'explore',
            reviewed_at: {
                $lt: yesterdayInMseconds
            },
        }).limit(limit || config.batchUserLimitCount);
    },

    async insertMany(pageArr) {
        return new Promise(async function (resolve, reject) {
            return await Page.insertMany(pageArr, function (err) {
                if (err) reject();
                console.log(pageArr.length + ' pages were added');
                resolve();
            });
        });
    },

    async setReviewed(page) {
        return new Promise(async function (resolve, reject) {
            await Page.update({
                username: page.username
            }, {
                $set: {
                    reviewed: true,
                    reviewed_at: Date.now()
                }
            }, function (err, page) {
                if (err) reject();
                resolve();
            });
        });
    },

    async setCommented(page) {
        return new Promise(async function (resolve, reject) {
            await Page.update({
                username: page.username
            }, {
                $set: {
                    type: 'commented',
                    reviewed: true,
                    reviewed_at: Date.now(),
                    commented_at: Date.now(),
                    commented_times: Number(Number(page.commented_times) >= Number(config.maxCommentForPageInDay)) ? 1 : (Number(page.commented_times) + 1)
                }
            }, function (err) {
                if (err) reject();
                console.log('Page ' + page.username + ' was commented');
                resolve();
            });
        }.bind(this));
    }
}