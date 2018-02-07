const config = require('../../config.json');
import Page from '../models/page';

export default {
    remove(page) {
        return Page.remove({
            username: page.username
        }, function (err) {
            if (err) console.log(err);
            console.log(page.username + ' was removed.');
        })
    },

    async private() {
        var d = new Date();
        d.setDate(d.getDate() - config.oldestPageInDays);
        let yesterdayInMseconds = Date.now() - d.getMilliseconds();
        return Page.find({
            reviewed: false,
            reviewed_at: {
                $lt: yesterdayInMseconds
            },
            type: 'private'
        })
    },

    async setReviewed(page) {
        return await Page.update({
            username: page.username
        }, {
            $set: {
                reviewed: true,
                reviewed_at: Date.now()
            }
        });
    }
}