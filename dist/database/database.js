'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _page = require('../models/page');

var _page2 = _interopRequireDefault(_page);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = require('../../config.json');

// var MongoClient = require('mongodb').MongoClient;
exports.default = {
    init: function init() {
        var connect = _mongoose2.default.connect(config.mongoDb + config.database);
        connect.then(function (db) {
            this.db = db;
            console.log('Connected to the database');
        }.bind(this));
        return this;
    },
    getUsersToFollow: function getUsersToFollow(limit) {
        return _user2.default.find({
            type: 'follow',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },
    getUsersToUnfollow: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(limit) {
            var d, yesterdayInMseconds;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            d = new Date();

                            d.setDate(d.getDate() - 1);
                            yesterdayInMseconds = Date.now() - d.getMilliseconds();
                            _context.next = 5;
                            return _user2.default.find({
                                type: 'followed',
                                reviewed: true,
                                followed_at: {
                                    $lte: yesterdayInMseconds
                                }
                            }).limit(limit || config.batchUserLimitCount);

                        case 5:
                            return _context.abrupt('return', _context.sent);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function getUsersToUnfollow(_x) {
            return _ref.apply(this, arguments);
        }

        return getUsersToUnfollow;
    }(),
    getUsersToLike: function getUsersToLike(limit) {
        return _user2.default.find({
            type: 'like',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },
    getUsersToAnalyze: function getUsersToAnalyze(limit) {
        return _user2.default.find({
            type: 'analyze',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },
    getPostsToComment: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(limit) {
            var d, yesterdayInMseconds, posts;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            d = new Date();

                            d.setDate(d.getDate() - 1);
                            yesterdayInMseconds = Date.now() - d.getMilliseconds();
                            _context2.next = 5;
                            return _post2.default.find({
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

                        case 5:
                            posts = _context2.sent;
                            _context2.next = 8;
                            return posts.filter(function (post) {
                                return post.page.length != [] ? true : false;
                            });

                        case 8:
                            posts = _context2.sent;
                            return _context2.abrupt('return', posts);

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function getPostsToComment(_x2) {
            return _ref2.apply(this, arguments);
        }

        return getPostsToComment;
    }(),
    getPostsToAnalyze: function getPostsToAnalyze(limit) {
        return _post2.default.find({
            type: 'analyze',
            reviewed: false
        }).sort({
            rating: -1
        }).limit(limit || config.batchUserLimitCount);
    }
};