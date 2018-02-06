const config = require('../../config.json');
import User from '../models/user';

export default {
    analyze(limit) {
        return User.find({
            type: 'analyze',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },

    follow(limit) {
        return User.find({
            type: 'follow',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },

    unfollow(limit) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        return User.find({
            type: 'followed',
            reviewed: true,
            followed_at: {
                $lte: yesterdayInMseconds
            }
        }).limit(limit || config.batchUserLimitCount);
    },

    like(limit) {
        return User.find({
            type: 'like',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },

    async insertMany(newUsers) {
        console.log('in InsertMany : ' + newUsers);
        await User.insertMany(newUsers, async function () {
            console.log(newUsers.length + ' users were added to collection');
        });
    },

    async setType(user, type) {
        return await User.update({
            username: user.username
        }, {
                $set: {
                    type,
                    reviewed: true,
                    reviewed_at: Date.now(),
                }
            });
    },

    async remove(user) {
        return User.remove({
            username: user.username
        }, function (err) {
            if (err) console.log(err);
            console.log(user.username + ' was removed');
        })
    }
}