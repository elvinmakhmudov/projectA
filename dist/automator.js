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
                                    _context2.next = 20;
                                    break;
                                }

                                _context2.next = 5;
                                return this.instagram.getPrivatePages();

                            case 5:
                                pages = _context2.sent;
                                i = 0;

                            case 7:
                                if (!(i < pages.length)) {
                                    _context2.next = 16;
                                    break;
                                }

                                username = pages[i].username;
                                //go to the username page

                                _context2.next = 11;
                                return this.instagram.goToUsername(username);

                            case 11:
                                _context2.next = 13;
                                return this.instagram.savePostsToAnalyze(pages[i]);

                            case 13:
                                i++;
                                _context2.next = 7;
                                break;

                            case 16:
                                _context2.next = 18;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 18:
                                _context2.next = 2;
                                break;

                            case 20:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
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
                var posts, users, newUsers, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context3.next = 39;
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
                                i = 0;

                            case 14:
                                if (!(i < posts.length)) {
                                    _context3.next = 35;
                                    break;
                                }

                                console.log(i + 1 + ' of ' + posts.length + ' posts.');
                                _context3.t1 = newUsers;
                                _context3.next = 19;
                                return this.instagram.getNewUsers(posts[i], users);

                            case 19:
                                _context3.t2 = _context3.sent;

                                _context3.t1.concat.call(_context3.t1, _context3.t2);

                                if (!(newUsers.length > config.userRefreshRate)) {
                                    _context3.next = 32;
                                    break;
                                }

                                _context3.next = 24;
                                return _user2.default.insertMany(newUsers);

                            case 24:
                                console.log(users.length + ' users found.');
                                _context3.next = 27;
                                return _user2.default.analyze();

                            case 27:
                                _context3.t3 = _context3.sent;

                                if (_context3.t3) {
                                    _context3.next = 30;
                                    break;
                                }

                                _context3.t3 = [];

                            case 30:
                                users = _context3.t3;

                                newUsers.length = 0;

                            case 32:
                                i++;
                                _context3.next = 14;
                                break;

                            case 35:
                                _context3.next = 37;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 37:
                                _context3.next = 2;
                                break;

                            case 39:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
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
                                    _context4.next = 24;
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
                                    _context4.next = 20;
                                    break;
                                }

                                _context4.next = 14;
                                return this.instagram.getUserType(users[i]);

                            case 14:
                                type = _context4.sent;
                                _context4.next = 17;
                                return _user2.default.setType(users[i], type);

                            case 17:
                                i++;
                                _context4.next = 11;
                                break;

                            case 20:
                                _context4.next = 22;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 22:
                                _context4.next = 3;
                                break;

                            case 24:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
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
                                return this.instagram.followUsers();

                            case 5:
                                _context5.next = 7;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay);

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

            function followUsers() {
                return _ref5.apply(this, arguments);
            }

            return followUsers;
        }()
    }, {
        key: 'unfollowUsers',
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
                                return this.instagram.unfollowUsers();

                            case 5:
                                _context6.next = 7;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay);

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