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

var _user3 = require('./models/user');

var _user4 = _interopRequireDefault(_user3);

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
                var pages, postsReviewed, posts, i, username;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context2.next = 37;
                                    break;
                                }

                                _context2.next = 5;
                                return _page2.default.private();

                            case 5:
                                pages = _context2.sent;
                                _context2.next = 8;
                                return _post2.default.reviewed();

                            case 8:
                                postsReviewed = _context2.sent;
                                posts = void 0;
                                //get new usernames

                                i = 0;

                            case 11:
                                if (!(i < pages.length)) {
                                    _context2.next = 33;
                                    break;
                                }

                                username = pages[i].username;
                                //go to the username page

                                _context2.prev = 13;
                                _context2.next = 16;
                                return this.instagram.goToUsername(username);

                            case 16:
                                _context2.next = 18;
                                return this.instagram.getNewPosts(pages[i], postsReviewed);

                            case 18:
                                posts = _context2.sent;
                                _context2.next = 21;
                                return _post2.default.insertMany(posts);

                            case 21:
                                _context2.next = 23;
                                return _page2.default.setReviewed(pages[i]);

                            case 23:
                                _context2.next = 30;
                                break;

                            case 25:
                                _context2.prev = 25;
                                _context2.t0 = _context2['catch'](13);
                                _context2.next = 29;
                                return _page2.default.remove(pages[i]);

                            case 29:
                                console.log(_context2.t0);

                            case 30:
                                i++;
                                _context2.next = 11;
                                break;

                            case 33:
                                _context2.next = 35;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 35:
                                _context2.next = 2;
                                break;

                            case 37:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[13, 25]]);
            }));

            function savePosts() {
                return _ref2.apply(this, arguments);
            }

            return savePosts;
        }()
    }, {
        key: 'analyzePosts',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var posts, users, newUsers, i, postData;
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

                                console.log('Analyzing posts.');
                                i = 0;

                            case 15:
                                if (!(i < posts.length)) {
                                    _context3.next = 33;
                                    break;
                                }

                                _context3.prev = 16;
                                _context3.next = 19;
                                return this.instagram.getPostData(posts[i], users);

                            case 19:
                                postData = _context3.sent;

                                newUsers.push.apply(newUsers, postData.newUsers);
                                _context3.next = 23;
                                return _post2.default.setReviewed(posts[i], postData);

                            case 23:
                                _context3.next = 30;
                                break;

                            case 25:
                                _context3.prev = 25;
                                _context3.t1 = _context3['catch'](16);

                                console.log(_context3.t1);
                                _context3.next = 30;
                                return _post2.default.remove(posts[i]);

                            case 30:
                                i++;
                                _context3.next = 15;
                                break;

                            case 33:
                                if (!(newUsers.length > 0)) {
                                    _context3.next = 45;
                                    break;
                                }

                                _context3.prev = 34;
                                _context3.next = 37;
                                return _user2.default.insertMany(newUsers);

                            case 37:
                                console.log(users.length + ' users found.');
                                newUsers.length = 0;
                                users.length = 0;
                                _context3.next = 45;
                                break;

                            case 42:
                                _context3.prev = 42;
                                _context3.t2 = _context3['catch'](34);

                                console.log(_context3.t2);

                            case 45:
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
                }, _callee3, this, [[16, 25], [34, 42]]);
            }));

            function analyzePosts() {
                return _ref3.apply(this, arguments);
            }

            return analyzePosts;
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
                                    _context4.next = 33;
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
                                    _context4.next = 29;
                                    break;
                                }

                                _context4.prev = 12;
                                _context4.next = 15;
                                return this.instagram.getUserType(users[i]);

                            case 15:
                                type = _context4.sent;

                                console.log('to ' + type);
                                _context4.next = 19;
                                return _user2.default.setType(users[i], type);

                            case 19:
                                _context4.next = 26;
                                break;

                            case 21:
                                _context4.prev = 21;
                                _context4.t1 = _context4['catch'](12);

                                console.log(_context4.t1);
                                _context4.next = 26;
                                return _user2.default.softDelete(users[i]);

                            case 26:
                                i++;
                                _context4.next = 11;
                                break;

                            case 29:
                                _context4.next = 31;
                                return this.instagram.sleep(config.sleepEveryIteration);

                            case 31:
                                _context4.next = 3;
                                break;

                            case 33:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[12, 21]]);
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
                                    _context5.next = 29;
                                    break;
                                }

                                _context5.next = 5;
                                return _user2.default.follow();

                            case 5:
                                users = _context5.sent;
                                i = 0;

                            case 7:
                                if (!(i < users.length)) {
                                    _context5.next = 25;
                                    break;
                                }

                                _context5.prev = 8;
                                _context5.next = 11;
                                return this.instagram.followUser(users[i]);

                            case 11:
                                followed = _context5.sent;
                                _context5.next = 14;
                                return _user2.default.setType(users[i], 'followed');

                            case 14:
                                console.log('followed');
                                _context5.next = 22;
                                break;

                            case 17:
                                _context5.prev = 17;
                                _context5.t0 = _context5['catch'](8);
                                _context5.next = 21;
                                return _user2.default.setType(users[i], 'error');

                            case 21:
                                console.log('Error following: ' + users[i].username);

                            case 22:
                                i++;
                                _context5.next = 7;
                                break;

                            case 25:
                                _context5.next = 27;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToFollowPerDay);

                            case 27:
                                _context5.next = 2;
                                break;

                            case 29:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[8, 17]]);
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
                                    _context6.next = 28;
                                    break;
                                }

                                _context6.next = 5;
                                return _user2.default.unfollow();

                            case 5:
                                users = _context6.sent;
                                i = 0;

                            case 7:
                                if (!(i < users.length)) {
                                    _context6.next = 24;
                                    break;
                                }

                                _context6.prev = 8;
                                _context6.next = 11;
                                return this.instagram.unfollowUser(users[i]);

                            case 11:
                                unfollowed = _context6.sent;
                                _context6.next = 14;
                                return _user2.default.setType(users[i], 'unfollowed');

                            case 14:
                                _context6.next = 21;
                                break;

                            case 16:
                                _context6.prev = 16;
                                _context6.t0 = _context6['catch'](8);
                                _context6.next = 20;
                                return _user2.default.setType(users[i], 'error');

                            case 20:
                                console.log('Error unfollowing: ' + users[i].username);

                            case 21:
                                i++;
                                _context6.next = 7;
                                break;

                            case 24:
                                _context6.next = 26;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.usersToUnfollowPerDay);

                            case 26:
                                _context6.next = 2;
                                break;

                            case 28:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[8, 16]]);
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
                var users, i;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context7.next = 27;
                                    break;
                                }

                                _context7.next = 5;
                                return _user2.default.like();

                            case 5:
                                users = _context7.sent;
                                i = 0;

                            case 7:
                                if (!(i < users.length)) {
                                    _context7.next = 23;
                                    break;
                                }

                                _context7.prev = 8;
                                _context7.next = 11;
                                return this.instagram.likeUserPosts(users[i]);

                            case 11:
                                _context7.next = 13;
                                return _user2.default.setType(users[i], 'liked');

                            case 13:
                                _context7.next = 20;
                                break;

                            case 15:
                                _context7.prev = 15;
                                _context7.t0 = _context7['catch'](8);
                                _context7.next = 19;
                                return _user2.default.softDelete(users[i]);

                            case 19:
                                console.log('Soft deleted: ' + users[i].username);

                            case 20:
                                i++;
                                _context7.next = 7;
                                break;

                            case 23:
                                _context7.next = 25;
                                return this.instagram.sleep(secondsInDay * config.userPostsToLike * config.batchUserLimitCount / config.usersToLikePerDay);

                            case 25:
                                _context7.next = 2;
                                break;

                            case 27:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[8, 15]]);
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
                var posts, i;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                if (!true) {
                                    _context8.next = 29;
                                    break;
                                }

                                _context8.next = 5;
                                return _post2.default.comment();

                            case 5:
                                posts = _context8.sent;
                                i = 0;

                            case 7:
                                if (!(i < posts.length)) {
                                    _context8.next = 25;
                                    break;
                                }

                                _context8.prev = 8;

                                console.log('Commenting ' + (i + 1) + ' of ' + posts.length + ' posts.');
                                _context8.next = 12;
                                return this.instagram.commentPosts(posts[i]);

                            case 12:
                                _context8.next = 14;
                                return _post2.default.setType(posts[i], 'commented');

                            case 14:
                                _context8.next = 16;
                                return _page2.default.setCommented(posts[i].page[0]);

                            case 16:
                                _context8.next = 22;
                                break;

                            case 18:
                                _context8.prev = 18;
                                _context8.t0 = _context8['catch'](8);
                                _context8.next = 22;
                                return _post2.default.remove(posts[i]);

                            case 22:
                                i++;
                                _context8.next = 7;
                                break;

                            case 25:
                                _context8.next = 27;
                                return this.instagram.sleep(secondsInDay * config.batchUserLimitCount / config.pagesToCommentPerDay);

                            case 27:
                                _context8.next = 2;
                                break;

                            case 29:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[8, 18]]);
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