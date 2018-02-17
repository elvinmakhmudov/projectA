"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class() {
    _classCallCheck(this, _class);

    this.users = {
        followed: 0,
        unfollowed: 0,
        liked: 0,
        analyzed: 0,
        toAnalyze: 0,
        toLike: 0,
        toFollow: 0,
        toUnfollow: 0
    };
    this.pages = {
        followed: 0,
        explored: 0
    };
    this.posts = {
        commented: 0,
        liked: 0,
        toComment: 0,
        toAnalyze: 0
    };
};

exports.default = _class;