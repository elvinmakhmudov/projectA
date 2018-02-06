'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _page = require('../models/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config.json');
exports.default = {
    remove: function remove(page) {
        return _page2.default.remove({
            username: page.username
        }, function (err) {
            if (err) console.log(err);
            console.log(page.username + ' was removed.');
        });
    }
};