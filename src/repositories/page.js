const config = require('../../config.json');
import Page from '../models/page';

export default {
    remove(page) {
        return new Promise(async function (resolve, reject) {
            await Page.remove({
                username: page.username
            }, function (err) {
                if (err) reject(err);
                console.log(page.username + ' was removed.');
                resolve();
            });
        });
    },

    async private(limit) {
        return new Promise(async function (resolve, reject) {
            return await Page.findRandom({
                type: 'private'
            }, {}, {
                limit: limit || config.batchUserLimitCount
            }, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
        // var d = new Date();
        // d.setDate(d.getDate() - config.oldestPageInDays);
        // let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        // Find "limit" random documents (defaults to array of 1)
        // return Page.findRandom({
        //     reviewed: false,
        //     // reviewed_at: {
        //     //     $lt: yesterdayInMseconds
        //     // },
        //     type: 'private'
        // }).limit(limit || config.batchUserLimitCount);
    },

    async explore(limit) {
        return new Promise(async function (resolve, reject) {
            var d = new Date();
            let yesterdayInMseconds = d.setDate(d.getDate() - 7);
            return Page.findRandom({
                type: 'explore',
                reviewed_at: {
                    $lt: yesterdayInMseconds
                },
            }, {}, {
                limit: limit || config.batchUserLimitCount
            }, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },

    async insertMany(pageArr) {
        return new Promise(async function (resolve, reject) {
            return await Page.collection.insertMany(pageArr, {
                ordered: false
            }, function (err) {
                if (err) reject(err);
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
                if (err) reject(err);
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
                if (err) reject(err);
                resolve();
            });
        }.bind(this));
    }
}