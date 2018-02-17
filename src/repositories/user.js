const config = require('../../config.json');
import User from '../models/user';

export default {
    all() {
        return User.find({});
    },

    analyze(limit) {
        return new Promise(function (resolve, reject) {
            return User.findRandom({
                type: 'analyze',
                reviewed: false
            }, {}, {
                limit: limit || config.batchUserLimitCount
            }, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
            // return User.find({
            //     type: 'analyze',
            //     reviewed: false
            // }).limit(limit || config.batchUserLimitCount);
        })
    },

    follow(limit) {
        return new Promise(function (resolve, reject) {
            return User.findRandom({
                type: 'follow',
                reviewed: true
            }, {}, {
                limit: limit || config.batchUserLimitCount
            }, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
        // return User.find({
        //     type: 'follow',
        //     reviewed: true
        // }).limit(limit || config.batchUserLimitCount);
    },

    unfollow(username, limit) {
        return new Promise(function (resolve, reject) {
            var d = new Date();
            d.setDate(d.getDate() - 7);
            let yesterdayInMseconds = Date.now() - d.getTime();
            return User.findRandom({
                type: 'followed',
                reviewed: true,
                reviewed_at: {
                    $lte: yesterdayInMseconds
                },
                followed_by: username
            }, {}, {
                limit: limit || config.batchUserLimitCount
            }, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
        // return User.find({ type: 'followed',
        //     reviewed: true,
        //     reviewed_at: {
        //         $lte: yesterdayInMseconds
        //     },
        //     followed_by: username
        // }).limit(limit || config.batchUserLimitCount);
    },

    like(limit) {
        return new Promise(function (resolve, reject) {
            // return User.find({
            //     type: 'like',
            //     reviewed: true
            // }).limit(limit || config.batchUserLimitCount);
            return User.findRandom({
                type: 'like',
                reviewed: true
            }, {}, {
                limit: limit || config.batchUserLimitCount
            }, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },

    async insertMany(newUsers) {
        return new Promise(async function (resolve, reject) {
            await User.collection.insertMany(newUsers, {
                ordered: false
            }, function (err, users) {
                // if (err) return reject(err);
                return resolve();
            });
        });
    },

    async setFollowed(user, by) {
        return new Promise(async function (resolve, reject) {
            await User.update({
                username: user.username
            }, {
                $set: {
                    type: 'followed',
                    reviewed: true,
                    reviewed_at: Date.now(),
                    followed_by: by
                }
            }, function (err, user) {
                if (err) return reject(err);
                return resolve();
            });
        });
    },

    async setType(user, type) {
        return new Promise(async function (resolve, reject) {
            await User.update({
                username: user.username
            }, {
                $set: {
                    type,
                    reviewed: true,
                    reviewed_at: Date.now(),
                }
            }, function (err, user) {
                if (err) return reject(err);
                return resolve();
            });
        });
    },

    async remove(user) {
        return User.remove({
            username: user.username
        }, function (err) {
            if (err) console.log(err);
            console.log(user.username + ' was removed');
        })
    },

    async softDelete(user) {
        return await this.setType(user, 'removed');
    }
}