'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _counter = require('./counter');

var _counter2 = _interopRequireDefault(_counter);

var _action = require('./action.js');

var _action2 = _interopRequireDefault(_action);

var _post = require('./repositories/post');

var _post2 = _interopRequireDefault(_post);

var _user = require('./repositories/user');

var _user2 = _interopRequireDefault(_user);

var _page = require('./repositories/page');

var _page2 = _interopRequireDefault(_page);

var _user3 = require('./models/user');

var _user4 = _interopRequireDefault(_user3);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

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
        this.counter = new _counter2.default();
        this.action = new _action2.default(this.counter, this.login, this.password, this.comments);
        this.logger = new _logger2.default(this.login);
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
                                return this.action.getFollowings();

                            case 2:
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
                var errors, explored;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.action.logIn();

                            case 2:
                                errors = 0;

                            case 3:
                                if (!true) {
                                    _context2.next = 24;
                                    break;
                                }

                                _context2.prev = 4;

                                if (!(errors >= config.maxErrors)) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 8;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 8:
                                errors = 0;

                            case 9:
                                explored = this.counter.pages.explored;
                                _context2.next = 12;
                                return this.action.findNewPages();

                            case 12:
                                if (!(this.counter.pages.explored > explored)) {
                                    _context2.next = 15;
                                    break;
                                }

                                _context2.next = 15;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 15:
                                errors = 0;
                                _context2.next = 22;
                                break;

                            case 18:
                                _context2.prev = 18;
                                _context2.t0 = _context2['catch'](4);

                                this.logger.update(_context2.t0);
                                errors++;

                            case 22:
                                _context2.next = 3;
                                break;

                            case 24:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 18]]);
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context3.next = 8;
                                    break;
                                }

                                this.action.getPostsToComment();
                                _context3.next = 6;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 6:
                                _context3.next = 2;
                                break;

                            case 8:
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context4.next = 8;
                                    break;
                                }

                                this.action.savePosts();
                                _context4.next = 6;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 6:
                                _context4.next = 2;
                                break;

                            case 8:
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context5.next = 8;
                                    break;
                                }

                                this.action.analyzePosts();
                                _context5.next = 6;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 6:
                                _context5.next = 2;
                                break;

                            case 8:
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context6.next = 8;
                                    break;
                                }

                                this.action.analyzeUsers();
                                _context6.next = 6;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 6:
                                _context6.next = 2;
                                break;

                            case 8:
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context7.next = 8;
                                    break;
                                }

                                this.action.followUsers();
                                _context7.next = 6;
                                return this.action.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay, true);

                            case 6:
                                _context7.next = 2;
                                break;

                            case 8:
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context8.next = 8;
                                    break;
                                }

                                this.action.unfollowUsers();
                                _context8.next = 6;
                                return this.action.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay, true);

                            case 6:
                                _context8.next = 2;
                                break;

                            case 8:
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context9.next = 8;
                                    break;
                                }

                                this.action.likeUserPosts();
                                _context9.next = 6;
                                return this.action.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay, true);

                            case 6:
                                _context9.next = 2;
                                break;

                            case 8:
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
                                return this.action.logIn();

                            case 2:
                                if (!true) {
                                    _context10.next = 8;
                                    break;
                                }

                                this.action.commentPosts();
                                _context10.next = 6;
                                return this.action.sleep(secondsInDay * config.batchUserLimitCount / config.pagesToCommentPerDay, true);

                            case 6:
                                _context10.next = 2;
                                break;

                            case 8:
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
                var started, errors, liked, followed, commented, unfollowed;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return this.action.logIn();

                            case 2:
                                started = new Date();
                                errors = 0;

                            case 4:
                                if (!true) {
                                    _context11.next = 72;
                                    break;
                                }

                                if (!(errors > config.maxErrors)) {
                                    _context11.next = 9;
                                    break;
                                }

                                this.logger.update('SLEEPING AFTER ERRORS');
                                _context11.next = 9;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 9:
                                liked = this.counter.users.liked;
                                _context11.prev = 10;
                                _context11.next = 13;
                                return this.action.likeUserPosts();

                            case 13:
                                _context11.next = 19;
                                break;

                            case 15:
                                _context11.prev = 15;
                                _context11.t0 = _context11['catch'](10);

                                this.logger.update(_context11.t0);
                                errors++;

                            case 19:
                                if (!(this.counter.users.liked > liked)) {
                                    _context11.next = 23;
                                    break;
                                }

                                this.logger.update('LIKED ' + (this.counter.users.liked - liked) + ' USERS.');
                                _context11.next = 23;
                                return this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToLikePerDay * config.userPostsToLike * 4), true);

                            case 23:
                                followed = this.counter.users.followed;
                                _context11.prev = 24;
                                _context11.next = 27;
                                return this.action.followUsers();

                            case 27:
                                _context11.next = 33;
                                break;

                            case 29:
                                _context11.prev = 29;
                                _context11.t1 = _context11['catch'](24);

                                this.logger.update(_context11.t1);
                                errors++;

                            case 33:
                                if (!(this.counter.users.followed > followed)) {
                                    _context11.next = 37;
                                    break;
                                }

                                this.logger.update('FOLLOWED ' + (this.counter.users.followed - followed) + ' USERS.');
                                _context11.next = 37;
                                return this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToFollowPerDay * 4), true);

                            case 37:
                                commented = this.counter.posts.commented;
                                _context11.prev = 38;
                                _context11.next = 41;
                                return this.action.commentPosts();

                            case 41:
                                _context11.next = 47;
                                break;

                            case 43:
                                _context11.prev = 43;
                                _context11.t2 = _context11['catch'](38);

                                this.logger.update(_context11.t2);
                                errors++;

                            case 47:
                                if (!(this.counter.posts.commented > commented)) {
                                    _context11.next = 51;
                                    break;
                                }

                                this.logger.update('COMMENTED ' + (this.counter.posts.commented - commented) + ' POSTS.');
                                _context11.next = 51;
                                return this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay * 4), true);

                            case 51:
                                unfollowed = this.counter.users.unfollowed;
                                _context11.prev = 52;
                                _context11.next = 55;
                                return this.action.unfollowUsers();

                            case 55:
                                _context11.next = 61;
                                break;

                            case 57:
                                _context11.prev = 57;
                                _context11.t3 = _context11['catch'](52);

                                this.logger.update(_context11.t3);
                                errors++;

                            case 61:
                                if (!(this.counter.users.unfollowed > unfollowed)) {
                                    _context11.next = 65;
                                    break;
                                }

                                this.logger.update('UNFOLLOWED ' + (this.counter.users.unfollowed - unfollowed) + ' USERS.');
                                _context11.next = 65;
                                return this.action.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToUnfollowPerDay * 4), true);

                            case 65:
                                if (!(Math.round((Date.now() - started) / (1000 * 60 * 60)) >= config.workingHours)) {
                                    _context11.next = 70;
                                    break;
                                }

                                this.logger.update('LONG SLEEP');
                                _context11.next = 69;
                                return this.action.sleep((24 - config.workingHours) * 60 * 60);

                            case 69:
                                started = new Date();

                            case 70:
                                _context11.next = 4;
                                break;

                            case 72:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this, [[10, 15], [24, 29], [38, 43], [52, 57]]);
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
                var started, toComment;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return this.action.logIn();

                            case 2:
                                started = new Date();

                            case 3:
                                if (!true) {
                                    _context12.next = 24;
                                    break;
                                }

                                // let usersToAnalyze = this.counter.users.toAnalyze;
                                // try {
                                //     await this.action.analyzePosts();
                                // } catch (e) {
                                //     this.logger.update(e);
                                // }
                                // if (this.counter.users.toAnalyze > usersToAnalyze) {
                                //     this.logger.update('ADDED ' + (this.counter.users.toAnalyze - usersToAnalyze) + ' USERS TO ANALYZE.');
                                //     await this.action.sleep(config.sleepEveryIteration, true);
                                // }

                                // let analyzed = this.counter.users.analyzed;
                                // try {
                                //     await this.action.analyzeUsers();
                                // } catch (e) {
                                //     this.logger.update(e);
                                // }
                                // if (this.counter.users.analyzed > analyzed) {
                                //     this.logger.update('ANALYZED ' + (this.counter.users.analyzed - analyzed) + ' USERS.');
                                //     await this.action.sleep(config.sleepEveryIteration, true);
                                // }

                                // let postsToAnalyze = this.counter.posts.toAnalyze;
                                // try {
                                //     await this.action.savePosts();
                                // } catch (e) {
                                //     this.logger.update(e);
                                // }
                                // if (this.counter.posts.toAnalyze > postsToAnalyze) {
                                //     this.logger.update('ADDED ' + (this.counter.posts.toAnalyze - postsToAnalyze) + 'POSTS TO ANALYZE.');
                                //     await this.action.sleep(config.sleepEveryIteration, true);
                                // }

                                toComment = this.counter.posts.toComment;
                                _context12.prev = 5;
                                _context12.next = 8;
                                return this.action.getPostsToComment();

                            case 8:
                                _context12.next = 13;
                                break;

                            case 10:
                                _context12.prev = 10;
                                _context12.t0 = _context12['catch'](5);

                                this.logger.update(_context12.t0);

                            case 13:
                                if (!(this.counter.posts.toComment > toComment)) {
                                    _context12.next = 17;
                                    break;
                                }

                                this.logger.update('Get posts to comment is done.');
                                _context12.next = 17;
                                return this.action.sleep(config.sleepEveryIteration, true);

                            case 17:
                                if (!(Math.round((Date.now() - started) / (1000 * 60 * 60)) >= config.workingHours)) {
                                    _context12.next = 22;
                                    break;
                                }

                                this.logger.update('LONG SLEEP');
                                _context12.next = 21;
                                return this.action.sleep((24 - config.workingHours) * 60 * 60);

                            case 21:
                                started = new Date();

                            case 22:
                                _context12.next = 3;
                                break;

                            case 24:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this, [[5, 10]]);
            }));

            function tripleAnalyzator() {
                return _ref12.apply(this, arguments);
            }

            return tripleAnalyzator;
        }()
    }, {
        key: 'sleep',
        value: function sleep(seconds) {
            this.action.sleep(seconds, true);
            return this;
        }
    }]);

    return Automater;
}();

exports.default = Automater;