'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _InstagramAPI = require('./InstagramAPI.js');

var _InstagramAPI2 = _interopRequireDefault(_InstagramAPI);

var _post = require('./repositories/post');

var _post2 = _interopRequireDefault(_post);

var _user = require('./repositories/user');

var _user2 = _interopRequireDefault(_user);

var _page = require('./repositories/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var async = require('async');

var secondsInDay = 60 * 60 * config.workingHours;

var Automater = function () {
    function Automater(login, password) {
        _classCallCheck(this, Automater);

        this.login = login;
        this.password = password;
        this.instagram = new _InstagramAPI2.default(login, password).init();
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
        key: 'savePosts',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var pages, i, username;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context2.next = 28;
                                    break;
                                }

                                _context2.next = 5;
                                return this.instagram.getPrivatePages();

                            case 5:
                                pages = _context2.sent;
                                i = 0;

                            case 7:
                                if (!(i < pages.length)) {
                                    _context2.next = 24;
                                    break;
                                }

                                username = pages[i].username;
                                //go to the username page

                                _context2.prev = 9;
                                _context2.next = 12;
                                return this.instagram.goToUsername(username);

                            case 12:
                                _context2.next = 14;
                                return this.instagram.savePostsToAnalyze(pages[i]);

                            case 14:
                                _context2.next = 21;
                                break;

                            case 16:
                                _context2.prev = 16;
                                _context2.t0 = _context2['catch'](9);
                                _context2.next = 20;
                                return _page2.default.remove(pages[i]);

                            case 20:
                                console.log(_context2.t0);

                            case 21:
                                i++;
                                _context2.next = 7;
                                break;

                            case 24:
                                _context2.next = 26;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 26:
                                _context2.next = 2;
                                break;

                            case 28:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[9, 16]]);
            }));

            function savePosts() {
                return _ref2.apply(this, arguments);
            }

            return savePosts;
        }()
    }, {
        key: 'getNewUsers',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var posts, users, newUsers, tmpUsers, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context3.next = 49;
                                    break;
                                }

                                _context3.next = 5;
                                return _post2.default.analyze();

                            case 5:
                                posts = _context3.sent;
                                _context3.next = 8;
                                return _user2.default.analyze();

                            case 8:
                                _context3.t0 = _context3.sent;

                                if (_context3.t0) {
                                    _context3.next = 11;
                                    break;
                                }

                                _context3.t0 = [];

                            case 11:
                                users = _context3.t0;
                                newUsers = [];
                                tmpUsers = [];

                                console.log('Analyzing posts.');
                                i = 0;

                            case 16:
                                if (!(i < posts.length)) {
                                    _context3.next = 39;
                                    break;
                                }

                                _context3.prev = 17;
                                _context3.next = 20;
                                return this.instagram.getNewUsers(posts[i], users);

                            case 20:
                                tmpUsers = _context3.sent;
                                _context3.t1 = newUsers.push;
                                _context3.t2 = newUsers;
                                _context3.next = 25;
                                return this.instagram.getNewUsers(posts[i], users);

                            case 25:
                                _context3.t3 = _context3.sent;

                                _context3.t1.apply.call(_context3.t1, _context3.t2, _context3.t3);

                                console.log('tmpUsers: ' + tmpUsers.length);
                                console.log(newUsers.length);
                                _context3.next = 36;
                                break;

                            case 31:
                                _context3.prev = 31;
                                _context3.t4 = _context3['catch'](17);

                                console.log(_context3.t4);
                                _context3.next = 36;
                                return _post2.default.remove(posts[i]);

                            case 36:
                                i++;
                                _context3.next = 16;
                                break;

                            case 39:
                                console.log(newUsers);
                                _context3.next = 42;
                                return _user2.default.insertMany(newUsers);

                            case 42:
                                console.log(users.length + ' users found.');
                                newUsers.length = 0;
                                users.length = 0;
                                _context3.next = 47;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 47:
                                _context3.next = 2;
                                break;

                            case 49:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[17, 31]]);
            }));

            function getNewUsers() {
                return _ref3.apply(this, arguments);
            }

            return getNewUsers;
        }()
    }, {
        key: 'analyzeUsers',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var type, users, i;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                type = void 0;

                            case 3:
                                if (!true) {
                                    _context4.next = 32;
                                    break;
                                }

                                _context4.next = 6;
                                return _user2.default.analyze();

                            case 6:
                                _context4.t0 = _context4.sent;

                                if (_context4.t0) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.t0 = [];

                            case 9:
                                users = _context4.t0;
                                i = 0;

                            case 11:
                                if (!(i < users.length)) {
                                    _context4.next = 28;
                                    break;
                                }

                                _context4.prev = 12;
                                _context4.next = 15;
                                return this.instagram.getUserType(users[i]);

                            case 15:
                                type = _context4.sent;
                                _context4.next = 18;
                                return _user2.default.setType(users[i], type);

                            case 18:
                                _context4.next = 25;
                                break;

                            case 20:
                                _context4.prev = 20;
                                _context4.t1 = _context4['catch'](12);

                                console.log(_context4.t1);
                                _context4.next = 25;
                                return _user2.default.remove(users[i]);

                            case 25:
                                i++;
                                _context4.next = 11;
                                break;

                            case 28:
                                _context4.next = 30;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 30:
                                _context4.next = 3;
                                break;

                            case 32:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[12, 20]]);
            }));

            function analyzeUsers() {
                return _ref4.apply(this, arguments);
            }

            return analyzeUsers;
        }()
    }, {
        key: 'followUsers',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var users, i, followed;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context5.next = 20;
                                    break;
                                }

                                _context5.next = 5;
                                return _user2.default.follow();

                            case 5:
                                users = _context5.sent;
                                i = 0;

                            case 7:
                                if (!(i < users.length)) {
                                    _context5.next = 16;
                                    break;
                                }

                                _context5.next = 10;
                                return this.instagram.followUser(users[i]);

                            case 10:
                                followed = _context5.sent;
                                _context5.next = 13;
                                return _user2.default.setType(users[i], followed ? 'followed' : 'error');

                            case 13:
                                i++;
                                _context5.next = 7;
                                break;

                            case 16:
                                _context5.next = 18;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay);

                            case 18:
                                _context5.next = 2;
                                break;

                            case 20:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function followUsers() {
                return _ref5.apply(this, arguments);
            }

            return followUsers;
        }()
    }, {
        key: 'unfollowUsers',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var users, i, unfollowed;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context6.next = 20;
                                    break;
                                }

                                _context6.next = 5;
                                return _user2.default.unfollow();

                            case 5:
                                users = _context6.sent;
                                i = 0;

                            case 7:
                                if (!(i < users.length)) {
                                    _context6.next = 16;
                                    break;
                                }

                                _context6.next = 10;
                                return this.instagram.unfollowUser(users[i]);

                            case 10:
                                unfollowed = _context6.sent;
                                _context6.next = 13;
                                return _user2.default.setType(users[i], unfollowed ? 'unfollowed' : 'error');

                            case 13:
                                i++;
                                _context6.next = 7;
                                break;

                            case 16:
                                _context6.next = 18;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay);

                            case 18:
                                _context6.next = 2;
                                break;

                            case 20:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function unfollowUsers() {
                return _ref6.apply(this, arguments);
            }

            return unfollowUsers;
        }()
    }, {
        key: 'likeUserPosts',
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
                                return this.instagram.likeUserPosts();

                            case 5:
                                _context7.next = 7;
                                return this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay);

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

            function likeUserPosts() {
                return _ref7.apply(this, arguments);
            }

            return likeUserPosts;
        }()
    }, {
        key: 'commentPosts',
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
                                return this.instagram.commentPosts();

                            case 5:
                                _context8.next = 7;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.pagesToCommentPerDay);

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

            function commentPosts() {
                return _ref8.apply(this, arguments);
            }

            return commentPosts;
        }()
    }, {
        key: 'tripleCombo',
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
                                    _context9.next = 17;
                                    break;
                                }

                                _context9.next = 5;
                                return this.instagram.likeUserPosts();

                            case 5:
                                _context9.next = 7;
                                return this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / (config.usersToLikePerDay * 3));

                            case 7:
                                _context9.next = 9;
                                return this.instagram.followUsers();

                            case 9:
                                _context9.next = 11;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.usersToFollowPerDay * 3));

                            case 11:
                                _context9.next = 13;
                                return this.instagram.commentPosts();

                            case 13:
                                _context9.next = 15;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / (config.pagesToCommentPerDay * 3));

                            case 15:
                                _context9.next = 2;
                                break;

                            case 17:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function tripleCombo() {
                return _ref9.apply(this, arguments);
            }

            return tripleCombo;
        }()
    }]);

    return Automater;
}();

exports.default = Automater;