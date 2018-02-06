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
    }
}