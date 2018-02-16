'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _InstagramAPI = require('./InstagramAPI.js');

var _InstagramAPI2 = _interopRequireDefault(_InstagramAPI);

var _counter = require('./counter');

var _counter2 = _interopRequireDefault(_counter);

var _actions = require('./actions.js');

var _actions2 = _interopRequireDefault(_actions);

var _post = require('./repositories/post');

var _post2 = _interopRequireDefault(_post);

var _user = require('./repositories/user');

var _user2 = _interopRequireDefault(_user);

var _page = require('./repositories/page');

var _page2 = _interopRequireDefault(_page);

var _user3 = require('./models/user');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var async = require('async');

var secondsInDay = 60 * 60 * config.workingHours;

var Automater = function () {
    function Automater(login, password, comments) {
        _classCallCheck(this, Automater);

        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
        this.comments = comments || config.comments;
        this.instagram = new _InstagramAPI2.default(login, password, comments).init();
        return this;
    }

    _createClass(Automater, [{
        key: 'getFollowings',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                _context.next = 4;
                                return this.instagram.goToProfile();

                            case 4:
                                _context.next = 6;
                                return this.instagram.getAndSaveFollowings();

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getFollowings() {
                return _ref.apply(this, arguments);
            }

            return getFollowings;
        }()
    }, {
        key: 'findNewPages',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 5;
                                return _actions2.default.findNewPages.call(this);

                            case 5:
                                _context2.next = 7;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 7:
                                _context2.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function findNewPages() {
                return _ref2.apply(this, arguments);
            }

            return findNewPages;
        }()
    }, {
        key: 'getPostsToComment',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 5;
                                return _actions2.default.getPostsToComment.call(this);

                            case 5:
                                _context3.next = 7;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 7:
                                _context3.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getPostsToComment() {
                return _ref3.apply(this, arguments);
            }

            return getPostsToComment;
        }()
    }, {
        key: 'savePosts',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 5;
                                return _actions2.default.savePosts.call(this);

                            case 5:
                                _context4.next = 7;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 7:
                                _context4.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function savePosts() {
                return _ref4.apply(this, arguments);
            }

            return savePosts;
        }()
    }, {
        key: 'analyzePosts',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context5.next = 9;
                                    break;
                                }

                                _context5.next = 5;
                                return _actions2.default.analyzePosts.call(this);

                            case 5:
                                _context5.next = 7;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 7:
                                _context5.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function analyzePosts() {
                return _ref5.apply(this, arguments);
            }

            return analyzePosts;
        }()
    }, {
        key: 'analyzeUsers',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context6.next = 9;
                                    break;
                                }

                                _context6.next = 5;
                                return _actions2.default.analyzeUsers.call(this);

                            case 5:
                                _context6.next = 7;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 7:
                                _context6.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function analyzeUsers() {
                return _ref6.apply(this, arguments);
            }

            return analyzeUsers;
        }()
    }, {
        key: 'followUsers',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context7.next = 9;
                                    break;
                                }

                                _context7.next = 5;
                                return _actions2.default.followUsers.call(this);

                            case 5:
                                _context7.next = 7;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay, true);

                            case 7:
                                _context7.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function followUsers() {
                return _ref7.apply(this, arguments);
            }

            return followUsers;
        }()
    }, {
        key: 'unfollowUsers',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context8.next = 9;
                                    break;
                                }

                                _context8.next = 5;
                                return _actions2.default.unfollowUsers.call(this);

                            case 5:
                                _context8.next = 7;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay, true);

                            case 7:
                                _context8.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function unfollowUsers() {
                return _ref8.apply(this, arguments);
            }

            return unfollowUsers;
        }()
    }, {
        key: 'likeUserPosts',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context9.next = 9;
                                    break;
                                }

                                _context9.next = 5;
                                return _actions2.default.likeUserPosts.call(this);

                            case 5:
                                _context9.next = 7;
                                return this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay, true);

                            case 7:
                                _context9.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function likeUserPosts() {
                return _ref9.apply(this, arguments);
            }

            return likeUserPosts;
        }()
    }, {
        key: 'commentPosts',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context10.next = 9;
                                    break;
                                }

                                _context10.next = 5;
                                return _actions2.default.commentPosts.call(this);

                            case 5:
                                _context10.next = 7;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.pagesToCommentPerDay, true);

                            case 7:
                                _context10.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function commentPosts() {
                return _ref10.apply(this, arguments);
            }

            return commentPosts;
        }()
    }, {
        key: 'triplePageActions',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var liked, followed, commented, unfollowed;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context11.next = 33;
                                    break;
                                }

                                liked = _counter2.default.users.liked;

                            case 4:
                                _context11.next = 6;
                                return _actions2.default.likeUserPosts.call(this);

                            case 6:
                                console.log(this.login + ' : Liking user posts is done.');

                            case 7:
                                if (liked >= _counter2.default.users.liked) {
                                    _context11.next = 4;
                                    break;
                                }

                            case 8:
                                _context11.next = 10;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToLikePerDay * config.userPostsToLike * 4), true);

                            case 10:
                                followed = _counter2.default.users.followed;

                            case 11:
                                _context11.next = 13;
                                return _actions2.default.followUsers.call(this);

                            case 13:
                                console.log(this.login + ' : Following users is done');

                            case 14:
                                if (followed >= _counter2.default.users.followed) {
                                    _context11.next = 11;
                                    break;
                                }

                            case 15:
                                _context11.next = 17;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToFollowPerDay * 4), true);

                            case 17:
                                commented = _counter2.default.posts.commented;

                            case 18:
                                _context11.next = 20;
                                return _actions2.default.commentPosts.call(this);

                            case 20:
                                console.log(this.login + ' : Commenting posts is done.');

                            case 21:
                                if (commented >= _counter2.default.posts.commented) {
                                    _context11.next = 18;
                                    break;
                                }

                            case 22:
                                _context11.next = 24;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay * 4), true);

                            case 24:
                                unfollowed = _counter2.default.users.unfollowed;

                            case 25:
                                _context11.next = 27;
                                return _actions2.default.unfollowUsers.call(this);

                            case 27:
                                console.log(this.login + ' : Unfollowing users is done.');

                            case 28:
                                if (unfollowed >= _counter2.default.users.unfollowed) {
                                    _context11.next = 25;
                                    break;
                                }

                            case 29:
                                _context11.next = 31;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToUnfollowPerDay * 4), true);

                            case 31:
                                _context11.next = 2;
                                break;

                            case 33:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function triplePageActions() {
                return _ref11.apply(this, arguments);
            }

            return triplePageActions;
        }()
    }, {
        key: 'tripleAnalyzator',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var usersToAnalyze, analyzed, postsToAnalyze, toComment;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context12.next = 61;
                                    break;
                                }

                                usersToAnalyze = _counter2.default.users.toAnalyze;

                            case 4:
                                _context12.prev = 4;
                                _context12.next = 7;
                                return _actions2.default.analyzePosts.call(this);

                            case 7:
                                _context12.next = 13;
                                break;

                            case 9:
                                _context12.prev = 9;
                                _context12.t0 = _context12['catch'](4);

                                console.log(_context12.t0);
                                return _context12.abrupt('break', 14);

                            case 13:
                                if (usersToAnalyze >= _counter2.default.users.toAnalyze) {
                                    _context12.next = 4;
                                    break;
                                }

                            case 14:
                                console.log(this.login + ' : Analyzing posts is done.');
                                _context12.next = 17;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 17:
                                analyzed = _counter2.default.users.analyzed;

                            case 18:
                                _context12.prev = 18;
                                _context12.next = 21;
                                return _actions2.default.analyzeUsers.call(this);

                            case 21:
                                _context12.next = 27;
                                break;

                            case 23:
                                _context12.prev = 23;
                                _context12.t1 = _context12['catch'](18);

                                console.log(_context12.t1);
                                return _context12.abrupt('break', 28);

                            case 27:
                                if (analyzed >= _counter2.default.users.analyzed) {
                                    _context12.next = 18;
                                    break;
                                }

                            case 28:
                                console.log(this.login + ' : Analyzing users is done.');
                                _context12.next = 31;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 31:
                                postsToAnalyze = _counter2.default.posts.toAnalyze;

                            case 32:
                                _context12.prev = 32;
                                _context12.next = 35;
                                return _actions2.default.savePosts.call(this);

                            case 35:
                                _context12.next = 41;
                                break;

                            case 37:
                                _context12.prev = 37;
                                _context12.t2 = _context12['catch'](32);

                                console.log(_context12.t2);
                                return _context12.abrupt('break', 42);

                            case 41:
                                if (postsToAnalyze >= _counter2.default.posts.toAnalyze) {
                                    _context12.next = 32;
                                    break;
                                }

                            case 42:
                                console.log(this.login + ' : Save posts is done.');
                                _context12.next = 45;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 45:
                                toComment = _counter2.default.posts.toComment;

                            case 46:
                                _context12.prev = 46;
                                _context12.next = 49;
                                return _actions2.default.getPostsToComment.call(this);

                            case 49:
                                _context12.next = 55;
                                break;

                            case 51:
                                _context12.prev = 51;
                                _context12.t3 = _context12['catch'](46);

                                console.log(_context12.t3);
                                return _context12.abrupt('break', 56);

                            case 55:
                                if (toComment >= _counter2.default.posts.toComment) {
                                    _context12.next = 46;
                                    break;
                                }

                            case 56:
                                console.log(this.login + ' : Get posts to comment is done.');
                                _context12.next = 59;
                                return this.instagram.sleep(config.sleepEveryIteration, true);

                            case 59:
                                _context12.next = 2;
                                break;

                            case 61:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this, [[4, 9], [18, 23], [32, 37], [46, 51]]);
            }));

            function tripleAnalyzator() {
                return _ref12.apply(this, arguments);
            }

            return tripleAnalyzator;
        }()
    }]);

    return Automater;
}();

exports.default = Automater;