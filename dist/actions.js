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
            var explorePages, i, k, postsFor, posts, j, rating;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            explorePages = void 0;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return _page2.default.explore(10);

                        case 4:
                            explorePages = _context2.sent;

                            console.log(this.login + ' : Pages to explore : ' + explorePages.length);
                            _context2.next = 11;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](1);

                            console.log(_context2.t0);

                        case 11:
                            i = 0, k = 0;

                        case 12:
                            if (!(k < explorePages.length && i < explorePages.length)) {
                                _context2.next = 48;
                                break;
                            }

                            _context2.prev = 13;
                            _context2.next = 16;
                            return this.instagram.goToUsername(explorePages[i].username);

                        case 16:
                            _context2.next = 18;
                            return _post2.default.postsFor(explorePages[i]);

                        case 18:
                            postsFor = _context2.sent;

                            console.log(this.login + ' : post to analyze for a user is : ' + postsFor.length);
                            _context2.next = 22;
                            return this.instagram.getNewPosts(explorePages[i], postsFor, 'comment');

                        case 22:
                            posts = _context2.sent;

                            console.log(this.login + ' : posts length is : ' + posts.length);
                            j = 0;

                        case 25:
                            if (!(j < posts.length)) {
                                _context2.next = 38;
                                break;
                            }

                            _context2.prev = 26;
                            _context2.next = 29;
                            return this.instagram.getRating(posts[j]);

                        case 29:
                            rating = _context2.sent;

                            posts[j].rating = rating;
                            _context2.next = 35;
                            break;

                        case 33:
                            _context2.prev = 33;
                            _context2.t1 = _context2['catch'](26);

                        case 35:
                            j++;
                            _context2.next = 25;
                            break;

                        case 38:
                            _context2.next = 40;
                            return _post2.default.insertMany(posts);

                        case 40:
                            k++;
                            _context2.next = 45;
                            break;

                        case 43:
                            _context2.prev = 43;
                            _context2.t2 = _context2['catch'](13);

                        case 45:
                            i++;
                            _context2.next = 12;
                            break;

                        case 48:
                            // await pagerepo.insertMany(explorePages)
                            console.log(this.login + ' : inserting explore pages');

                        case 49:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[1, 8], [13, 43], [26, 33]]);
        }));

        function getPostsToComment() {
            return _ref2.apply(this, arguments);
        }

        return getPostsToComment;
    }(),
    savePosts: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var pages, postsReviewed, posts, i, j, username;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            pages = void 0, postsReviewed = void 0;
                            _context3.prev = 1;
                            _context3.next = 4;
                            return _page2.default.private(20);

                        case 4:
                            pages = _context3.sent;

                            console.log(this.login + ' : Private page size is : ' + pages.length);
                            _context3.next = 8;
                            return _post2.default.reviewed();

                        case 8:
                            postsReviewed = _context3.sent;

                            console.log(this.login + ' : Reviewed posts size is : ' + postsReviewed.length);
                            _context3.next = 15;
                            break;

                        case 12:
                            _context3.prev = 12;
                            _context3.t0 = _context3['catch'](1);

                            console.log(_context3.t0);

                        case 15:
                            posts = void 0;
                            //get new usernames

                            i = 0, j = 0;

                        case 17:
                            if (!(j < pages.length && i < pages.length)) {
                                _context3.next = 37;
                                break;
                            }

                            username = pages[i].username;
                            //go to the username page

                            _context3.prev = 19;
                            _context3.next = 22;
                            return this.instagram.goToUsername(username);

                        case 22:
                            _context3.next = 24;
                            return this.instagram.getNewPosts(pages[i], postsReviewed, 'analyze');

                        case 24:
                            posts = _context3.sent;
                            _context3.next = 27;
                            return _post2.default.insertMany(posts);

                        case 27:
                            j++;
                            _context3.next = 32;
                            break;

                        case 30:
                            _context3.prev = 30;
                            _context3.t1 = _context3['catch'](19);

                        case 32:
                            _context3.next = 34;
                            return _page2.default.setReviewed(pages[i]);

                        case 34:
                            i++;
                            _context3.next = 17;
                            break;

                        case 37:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[1, 12], [19, 30]]);
        }));

        function savePosts() {
            return _ref3.apply(this, arguments);
        }

        return savePosts;
    }(),
    analyzePosts: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var posts, users, newUsers, i, j, postData;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            posts = void 0, users = void 0;
                            _context4.prev = 1;
                            _context4.next = 4;
                            return _post2.default.analyze(10);

                        case 4:
                            posts = _context4.sent;

                            console.log(this.login + ' : Posts to analyze : ' + posts.length);
                            _context4.next = 8;
                            return _user2.default.analyze();

                        case 8:
                            _context4.t0 = _context4.sent;

                            if (_context4.t0) {
                                _context4.next = 11;
                                break;
                            }

                            _context4.t0 = [];

                        case 11:
                            users = _context4.t0;
                            _context4.next = 17;
                            break;

                        case 14:
                            _context4.prev = 14;
                            _context4.t1 = _context4['catch'](1);

                            console.log(_context4.t1);

                        case 17:
                            newUsers = [];

                            console.log(this.login + ' : Analyzing posts.');
                            i = 0, j = 0;

                        case 20:
                            if (!(j < posts.length && i < posts.length)) {
                                _context4.next = 38;
                                break;
                            }

                            _context4.prev = 21;
                            _context4.next = 24;
                            return this.instagram.getPostData(posts[i], users);

                        case 24:
                            postData = _context4.sent;

                            newUsers.push.apply(newUsers, postData.newUsers);
                            _context4.next = 28;
                            return _post2.default.setReviewed(posts[i], postData);

                        case 28:
                            j++;
                            _context4.next = 35;
                            break;

                        case 31:
                            _context4.prev = 31;
                            _context4.t2 = _context4['catch'](21);
                            _context4.next = 35;
                            return _post2.default.remove(posts[i]);

                        case 35:
                            i++;
                            _context4.next = 20;
                            break;

                        case 38:
                            if (!(newUsers.length > 0)) {
                                _context4.next = 49;
                                break;
                            }

                            _context4.prev = 39;
                            _context4.next = 42;
                            return _user2.default.insertMany(newUsers);

                        case 42:
                            console.log(this.login + ' : ' + users.length + ' users found.');
                            newUsers.length = 0;
                            users.length = 0;
                            _context4.next = 49;
                            break;

                        case 47:
                            _context4.prev = 47;
                            _context4.t3 = _context4['catch'](39);

                        case 49:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this, [[1, 14], [21, 31], [39, 47]]);
        }));

        function analyzePosts() {
            return _ref4.apply(this, arguments);
        }

        return analyzePosts;
    }(),
    analyzeUsers: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var users, i, j, type;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            users = void 0;
                            _context5.prev = 1;
                            _context5.next = 4;
                            return _user2.default.analyze(10);

                        case 4:
                            _context5.t0 = _context5.sent;

                            if (_context5.t0) {
                                _context5.next = 7;
                                break;
                            }

                            _context5.t0 = [];

                        case 7:
                            users = _context5.t0;

                            console.log(this.login + ' : Users  to analyze : ' + users.length);
                            _context5.next = 14;
                            break;

                        case 11:
                            _context5.prev = 11;
                            _context5.t1 = _context5['catch'](1);

                            console.log(_context5.t1);

                        case 14:
                            i = 0, j = 0;

                        case 15:
                            if (!(j < users.length && i < users.length)) {
                                _context5.next = 32;
                                break;
                            }

                            _context5.prev = 16;
                            _context5.next = 19;
                            return this.instagram.getUserType(users[i]);

                        case 19:
                            type = _context5.sent;
                            _context5.next = 22;
                            return _user2.default.setType(users[i], type);

                        case 22:
                            j++;
                            _context5.next = 29;
                            break;

                        case 25:
                            _context5.prev = 25;
                            _context5.t2 = _context5['catch'](16);
                            _context5.next = 29;
                            return _user2.default.softDelete(users[i]);

                        case 29:
                            i++;
                            _context5.next = 15;
                            break;

                        case 32:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this, [[1, 11], [16, 25]]);
        }));

        function analyzeUsers() {
            return _ref5.apply(this, arguments);
        }

        return analyzeUsers;
    }(),
    followUsers: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var users, i, j, followed;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            users = void 0;
                            _context6.prev = 1;
                            _context6.next = 4;
                            return _user2.default.follow();

                        case 4:
                            users = _context6.sent;

                            console.log(this.login + ' : Users  to follow : ' + users.length);
                            _context6.next = 11;
                            break;

                        case 8:
                            _context6.prev = 8;
                            _context6.t0 = _context6['catch'](1);

                            console.log(_context6.t0);

                        case 11:
                            i = 0, j = 0;

                        case 12:
                            if (!(j < users.length && i < users.length)) {
                                _context6.next = 30;
                                break;
                            }

                            _context6.prev = 13;
                            _context6.next = 16;
                            return this.instagram.followUser(users[i]);

                        case 16:
                            followed = _context6.sent;
                            _context6.next = 19;
                            return _user2.default.setFollowed(users[i], this.login);

                        case 19:
                            j++;
                            _context6.next = 27;
                            break;

                        case 22:
                            _context6.prev = 22;
                            _context6.t1 = _context6['catch'](13);
                            _context6.next = 26;
                            return _user2.default.setType(users[i], 'error');

                        case 26:
                            console.log(this.login + ' : Error following: ' + users[i].username);

                        case 27:
                            i++;
                            _context6.next = 12;
                            break;

                        case 30:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this, [[1, 8], [13, 22]]);
        }));

        function followUsers() {
            return _ref6.apply(this, arguments);
        }

        return followUsers;
    }(),
    unfollowUsers: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var users, i, j, unfollowed;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            // await this.instagram.unfollowUsers();
                            users = void 0;
                            _context7.prev = 1;
                            _context7.next = 4;
                            return _user2.default.unfollow();

                        case 4:
                            users = _context7.sent;

                            console.log(this.login + ' : Users  to unfollow : ' + users.length);
                            _context7.next = 11;
                            break;

                        case 8:
                            _context7.prev = 8;
                            _context7.t0 = _context7['catch'](1);

                            console.log(_context7.t0);

                        case 11:
                            i = 0, j = 0;

                        case 12:
                            if (!(j < users.length && i < users.length)) {
                                _context7.next = 30;
                                break;
                            }

                            _context7.prev = 13;
                            _context7.next = 16;
                            return this.instagram.unfollowUser(users[i]);

                        case 16:
                            unfollowed = _context7.sent;
                            _context7.next = 19;
                            return _user2.default.setType(users[i], 'unfollowed');

                        case 19:
                            j++;
                            _context7.next = 27;
                            break;

                        case 22:
                            _context7.prev = 22;
                            _context7.t1 = _context7['catch'](13);
                            _context7.next = 26;
                            return _user2.default.setType(users[i], 'error');

                        case 26:
                            console.log(this.login + ' : Error unfollowing: ' + users[i].username);

                        case 27:
                            i++;
                            _context7.next = 12;
                            break;

                        case 30:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this, [[1, 8], [13, 22]]);
        }));

        function unfollowUsers() {
            return _ref7.apply(this, arguments);
        }

        return unfollowUsers;
    }(),
    likeUserPosts: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var users, i, j;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            users = void 0;
                            _context8.prev = 1;
                            _context8.next = 4;
                            return _user2.default.like();

                        case 4:
                            users = _context8.sent;

                            console.log(this.login + ' : Users  to like : ' + users.length);
                            _context8.next = 11;
                            break;

                        case 8:
                            _context8.prev = 8;
                            _context8.t0 = _context8['catch'](1);

                            console.log(_context8.t0);

                        case 11:
                            i = 0, j = 0;

                        case 12:
                            if (!(j < users.length && i < users.length)) {
                                _context8.next = 29;
                                break;
                            }

                            _context8.prev = 13;
                            _context8.next = 16;
                            return this.instagram.likeUserPosts(users[i]);

                        case 16:
                            _context8.next = 18;
                            return _user2.default.setType(users[i], 'liked');

                        case 18:
                            j++;
                            _context8.next = 26;
                            break;

                        case 21:
                            _context8.prev = 21;
                            _context8.t1 = _context8['catch'](13);
                            _context8.next = 25;
                            return _user2.default.softDelete(users[i]);

                        case 25:
                            console.log(this.login + ' : Soft deleted: ' + users[i].username);

                        case 26:
                            i++;
                            _context8.next = 12;
                            break;

                        case 29:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this, [[1, 8], [13, 21]]);
        }));

        function likeUserPosts() {
            return _ref8.apply(this, arguments);
        }

        return likeUserPosts;
    }(),
    commentPosts: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var posts, i, j;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            posts = void 0;
                            _context9.prev = 1;
                            _context9.next = 4;
                            return _post2.default.comment();

                        case 4:
                            posts = _context9.sent;

                            console.log(this.login + ' : Posts to comment : ' + posts.length);
                            _context9.next = 11;
                            break;

                        case 8:
                            _context9.prev = 8;
                            _context9.t0 = _context9['catch'](1);

                            console.log(_context9.t0);

                        case 11:
                            i = 0, j = 0;

                        case 12:
                            if (!(j < posts.length && i < posts.length)) {
                                _context9.next = 31;
                                break;
                            }

                            _context9.prev = 13;

                            console.log(this.login + ' : Commenting ' + (i + 1) + ' of ' + posts.length + ' posts.');
                            _context9.next = 17;
                            return this.instagram.commentPosts(posts[i]);

                        case 17:
                            _context9.next = 19;
                            return _post2.default.setType(posts[i], 'commented');

                        case 19:
                            _context9.next = 21;
                            return _page2.default.setCommented(posts[i].page[0]);

                        case 21:
                            j++;
                            _context9.next = 28;
                            break;

                        case 24:
                            _context9.prev = 24;
                            _context9.t1 = _context9['catch'](13);
                            _context9.next = 28;
                            return _post2.default.remove(posts[i]);

                        case 28:
                            i++;
                            _context9.next = 12;
                            break;

                        case 31:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this, [[1, 8], [13, 24]]);
        }));

        function commentPosts() {
            return _ref9.apply(this, arguments);
        }

        return commentPosts;
    }()
};