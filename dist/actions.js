'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var config = require('../config.json');
exports.default = {
    findNewPages: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var postsReviewed, oldExplorePages, posts, explorePages;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _post2.default.reviewed();

                        case 2:
                            postsReviewed = _context.sent;
                            _context.next = 5;
                            return _page2.default.explore();

                        case 5:
                            oldExplorePages = _context.sent;
                            posts = void 0;
                            _context.next = 9;
                            return this.instagram.goToUsername(oldExplorePages.length > 0 ? oldExplorePages[Math.floor(Math.random() * oldExplorePages.length)].username : "qizlargramm");

                        case 9:
                            _context.prev = 9;
                            _context.next = 12;
                            return this.instagram.explorePage(oldExplorePages);

                        case 12:
                            explorePages = _context.sent;
                            _context.next = 17;
                            break;

                        case 15:
                            _context.prev = 15;
                            _context.t0 = _context['catch'](9);

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[9, 15]]);
        }));

        function findNewPages() {
            return _ref.apply(this, arguments);
        }

        return findNewPages;
    }(),
    getPostsToComment: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var explorePages, i, postsFor, posts, j, rating;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _page2.default.explore(10);

                        case 2:
                            explorePages = _context2.sent;

                            console.log(this.login + ' : Pages to explore : ' + explorePages.length);
                            i = 0;

                        case 5:
                            if (!(i < explorePages.length)) {
                                _context2.next = 40;
                                break;
                            }

                            _context2.prev = 6;
                            _context2.next = 9;
                            return this.instagram.goToUsername(explorePages[i].username);

                        case 9:
                            _context2.next = 11;
                            return _post2.default.postsFor(explorePages[i]);

                        case 11:
                            postsFor = _context2.sent;

                            console.log(this.login + ' : post to analyze for a user is : ' + postsFor.length);
                            _context2.next = 15;
                            return this.instagram.getNewPosts(explorePages[i], postsFor, 'comment');

                        case 15:
                            posts = _context2.sent;

                            console.log(this.login + ' : posts length is : ' + posts.length);
                            j = 0;

                        case 18:
                            if (!(j < posts.length)) {
                                _context2.next = 31;
                                break;
                            }

                            _context2.prev = 19;
                            _context2.next = 22;
                            return this.instagram.getRating(posts[j]);

                        case 22:
                            rating = _context2.sent;

                            posts[j].rating = rating;
                            _context2.next = 28;
                            break;

                        case 26:
                            _context2.prev = 26;
                            _context2.t0 = _context2['catch'](19);

                        case 28:
                            j++;
                            _context2.next = 18;
                            break;

                        case 31:
                            _context2.next = 33;
                            return _post2.default.insertMany(posts);

                        case 33:
                            _context2.next = 37;
                            break;

                        case 35:
                            _context2.prev = 35;
                            _context2.t1 = _context2['catch'](6);

                        case 37:
                            i++;
                            _context2.next = 5;
                            break;

                        case 40:
                            // await pagerepo.insertMany(explorePages)
                            console.log(this.login + ' : inserting explore pages');

                        case 41:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[6, 35], [19, 26]]);
        }));

        function getPostsToComment() {
            return _ref2.apply(this, arguments);
        }

        return getPostsToComment;
    }(),
    savePosts: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var pages, postsReviewed, posts, i, username;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _page2.default.private(10);

                        case 2:
                            pages = _context3.sent;

                            console.log(this.login + ' : Private page size is : ' + pages.length);
                            _context3.next = 6;
                            return _post2.default.reviewed();

                        case 6:
                            postsReviewed = _context3.sent;

                            console.log(this.login + ' : Reviewed posts size is : ' + postsReviewed.length);
                            posts = void 0;
                            //get new usernames

                            i = 0;

                        case 10:
                            if (!(i < pages.length)) {
                                _context3.next = 29;
                                break;
                            }

                            username = pages[i].username;
                            //go to the username page

                            _context3.prev = 12;
                            _context3.next = 15;
                            return this.instagram.goToUsername(username);

                        case 15:
                            _context3.next = 17;
                            return this.instagram.getNewPosts(pages[i], postsReviewed, 'analyze');

                        case 17:
                            posts = _context3.sent;
                            _context3.next = 20;
                            return _post2.default.insertMany(posts);

                        case 20:
                            _context3.next = 22;
                            return _page2.default.setReviewed(pages[i]);

                        case 22:
                            _context3.next = 26;
                            break;

                        case 24:
                            _context3.prev = 24;
                            _context3.t0 = _context3['catch'](12);

                        case 26:
                            i++;
                            _context3.next = 10;
                            break;

                        case 29:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[12, 24]]);
        }));

        function savePosts() {
            return _ref3.apply(this, arguments);
        }

        return savePosts;
    }(),
    analyzePosts: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var posts, users, newUsers, i, postData;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _post2.default.analyze(10);

                        case 2:
                            posts = _context4.sent;

                            console.log(this.login + ' : Posts to analyze : ' + posts.length);
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
                            newUsers = [];

                            console.log(this.login + ' : Analyzing posts.');
                            i = 0;

                        case 13:
                            if (!(i < posts.length)) {
                                _context4.next = 30;
                                break;
                            }

                            _context4.prev = 14;
                            _context4.next = 17;
                            return this.instagram.getPostData(posts[i], users);

                        case 17:
                            postData = _context4.sent;

                            newUsers.push.apply(newUsers, postData.newUsers);
                            _context4.next = 21;
                            return _post2.default.setReviewed(posts[i], postData);

                        case 21:
                            _context4.next = 27;
                            break;

                        case 23:
                            _context4.prev = 23;
                            _context4.t1 = _context4['catch'](14);
                            _context4.next = 27;
                            return _post2.default.remove(posts[i]);

                        case 27:
                            i++;
                            _context4.next = 13;
                            break;

                        case 30:
                            if (!(newUsers.length > 0)) {
                                _context4.next = 41;
                                break;
                            }

                            _context4.prev = 31;
                            _context4.next = 34;
                            return _user2.default.insertMany(newUsers);

                        case 34:
                            console.log(this.login + ' : ' + users.length + ' users found.');
                            newUsers.length = 0;
                            users.length = 0;
                            _context4.next = 41;
                            break;

                        case 39:
                            _context4.prev = 39;
                            _context4.t2 = _context4['catch'](31);

                        case 41:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this, [[14, 23], [31, 39]]);
        }));

        function analyzePosts() {
            return _ref4.apply(this, arguments);
        }

        return analyzePosts;
    }(),
    analyzeUsers: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var users, i, type;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _user2.default.analyze(10);

                        case 2:
                            _context5.t0 = _context5.sent;

                            if (_context5.t0) {
                                _context5.next = 5;
                                break;
                            }

                            _context5.t0 = [];

                        case 5:
                            users = _context5.t0;

                            console.log(this.login + ' : Users  to analyze : ' + users.length);
                            i = 0;

                        case 8:
                            if (!(i < users.length)) {
                                _context5.next = 24;
                                break;
                            }

                            _context5.prev = 9;
                            _context5.next = 12;
                            return this.instagram.getUserType(users[i]);

                        case 12:
                            type = _context5.sent;
                            _context5.next = 15;
                            return _user2.default.setType(users[i], type);

                        case 15:
                            _context5.next = 21;
                            break;

                        case 17:
                            _context5.prev = 17;
                            _context5.t1 = _context5['catch'](9);
                            _context5.next = 21;
                            return _user2.default.softDelete(users[i]);

                        case 21:
                            i++;
                            _context5.next = 8;
                            break;

                        case 24:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[9, 17]]);
        }));

        function analyzeUsers() {
            return _ref5.apply(this, arguments);
        }

        return analyzeUsers;
    }(),
    followUsers: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var users, i, followed;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _user2.default.follow();

                        case 2:
                            users = _context6.sent;

                            console.log(this.login + ' : Users  to follow : ' + users.length);
                            i = 0;

                        case 5:
                            if (!(i < users.length)) {
                                _context6.next = 22;
                                break;
                            }

                            _context6.prev = 6;
                            _context6.next = 9;
                            return this.instagram.followUser(users[i]);

                        case 9:
                            followed = _context6.sent;
                            _context6.next = 12;
                            return _user2.default.setFollowed(users[i], this.login);

                        case 12:
                            _context6.next = 19;
                            break;

                        case 14:
                            _context6.prev = 14;
                            _context6.t0 = _context6['catch'](6);
                            _context6.next = 18;
                            return _user2.default.setType(users[i], 'error');

                        case 18:
                            console.log(this.login + ' : Error following: ' + users[i].username);

                        case 19:
                            i++;
                            _context6.next = 5;
                            break;

                        case 22:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this, [[6, 14]]);
        }));

        function followUsers() {
            return _ref6.apply(this, arguments);
        }

        return followUsers;
    }(),
    unfollowUsers: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var users, i, unfollowed;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return _user2.default.unfollow();

                        case 2:
                            users = _context7.sent;

                            console.log(this.login + ' : Users  to unfollow : ' + users.length);
                            i = 0;

                        case 5:
                            if (!(i < users.length)) {
                                _context7.next = 22;
                                break;
                            }

                            _context7.prev = 6;
                            _context7.next = 9;
                            return this.instagram.unfollowUser(users[i]);

                        case 9:
                            unfollowed = _context7.sent;
                            _context7.next = 12;
                            return _user2.default.setType(users[i], 'unfollowed');

                        case 12:
                            _context7.next = 19;
                            break;

                        case 14:
                            _context7.prev = 14;
                            _context7.t0 = _context7['catch'](6);
                            _context7.next = 18;
                            return _user2.default.setType(users[i], 'error');

                        case 18:
                            console.log(this.login + ' : Error unfollowing: ' + users[i].username);

                        case 19:
                            i++;
                            _context7.next = 5;
                            break;

                        case 22:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this, [[6, 14]]);
        }));

        function unfollowUsers() {
            return _ref7.apply(this, arguments);
        }

        return unfollowUsers;
    }(),
    likeUserPosts: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var users, i;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return _user2.default.like();

                        case 2:
                            users = _context8.sent;

                            console.log(this.login + ' : Users  to like : ' + users.length);
                            i = 0;

                        case 5:
                            if (!(i < users.length)) {
                                _context8.next = 21;
                                break;
                            }

                            _context8.prev = 6;
                            _context8.next = 9;
                            return this.instagram.likeUserPosts(users[i]);

                        case 9:
                            _context8.next = 11;
                            return _user2.default.setType(users[i], 'liked');

                        case 11:
                            _context8.next = 18;
                            break;

                        case 13:
                            _context8.prev = 13;
                            _context8.t0 = _context8['catch'](6);
                            _context8.next = 17;
                            return _user2.default.softDelete(users[i]);

                        case 17:
                            console.log(this.login + ' : Soft deleted: ' + users[i].username);

                        case 18:
                            i++;
                            _context8.next = 5;
                            break;

                        case 21:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this, [[6, 13]]);
        }));

        function likeUserPosts() {
            return _ref8.apply(this, arguments);
        }

        return likeUserPosts;
    }(),
    commentPosts: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var posts, i;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return _post2.default.comment();

                        case 2:
                            posts = _context9.sent;

                            console.log(this.login + ' : Posts to comment : ' + posts.length);
                            i = 0;

                        case 5:
                            if (!(i < posts.length)) {
                                _context9.next = 23;
                                break;
                            }

                            _context9.prev = 6;

                            console.log(this.login + ' : Commenting ' + (i + 1) + ' of ' + posts.length + ' posts.');
                            _context9.next = 10;
                            return this.instagram.commentPosts(posts[i]);

                        case 10:
                            _context9.next = 12;
                            return _post2.default.setType(posts[i], 'commented');

                        case 12:
                            _context9.next = 14;
                            return _page2.default.setCommented(posts[i].page[0]);

                        case 14:
                            _context9.next = 20;
                            break;

                        case 16:
                            _context9.prev = 16;
                            _context9.t0 = _context9['catch'](6);
                            _context9.next = 20;
                            return _post2.default.remove(posts[i]);

                        case 20:
                            i++;
                            _context9.next = 5;
                            break;

                        case 23:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this, [[6, 16]]);
        }));

        function commentPosts() {
            return _ref9.apply(this, arguments);
        }

        return commentPosts;
    }()
};