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

var _counter = require('./counter');

var _counter2 = _interopRequireDefault(_counter);

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
                            _context.next = 18;
                            break;

                        case 15:
                            _context.prev = 15;
                            _context.t0 = _context['catch'](9);

                            console.log(_context.t0);

                        case 18:
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
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', new Promise(function () {
                                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                                    var explorePages, oldPosts, i, k, posts, j, l, rating;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    explorePages = void 0;
                                                    _context2.prev = 1;
                                                    _context2.next = 4;
                                                    return _page2.default.explore(30);

                                                case 4:
                                                    explorePages = _context2.sent;

                                                    if (!(typeof explorePages === "undefined" || explorePages.length === 0)) {
                                                        _context2.next = 7;
                                                        break;
                                                    }

                                                    return _context2.abrupt('return', reject(this.login + ' : ERROR ON GETTINGS POSTS TO COMMENT. POSTS is undefined or posts.length is 0'));

                                                case 7:
                                                    console.log(this.login + ' : Pages to explore : ' + explorePages.length);
                                                    _context2.next = 10;
                                                    return _post2.default.explore();

                                                case 10:
                                                    oldPosts = _context2.sent;
                                                    _context2.next = 16;
                                                    break;

                                                case 13:
                                                    _context2.prev = 13;
                                                    _context2.t0 = _context2['catch'](1);

                                                    console.log(_context2.t0);

                                                case 16:
                                                    i = 0, k = 0;

                                                case 17:
                                                    if (!(k < explorePages.length && i < explorePages.length)) {
                                                        _context2.next = 55;
                                                        break;
                                                    }

                                                    _context2.prev = 18;
                                                    _context2.next = 21;
                                                    return this.instagram.goToUsername(explorePages[i].username);

                                                case 21:
                                                    _context2.next = 23;
                                                    return this.instagram.getNewPosts(explorePages[i], oldPosts, 'comment');

                                                case 23:
                                                    posts = _context2.sent;

                                                    console.log(this.login + ' : posts length is : ' + posts.length);
                                                    j = 0, l = 0;

                                                case 26:
                                                    if (!(j < posts.length && l < posts.length)) {
                                                        _context2.next = 41;
                                                        break;
                                                    }

                                                    _context2.prev = 27;
                                                    _context2.next = 30;
                                                    return this.instagram.getRating(posts[j]);

                                                case 30:
                                                    rating = _context2.sent;

                                                    posts[j].rating = rating;
                                                    l++;
                                                    _context2.next = 38;
                                                    break;

                                                case 35:
                                                    _context2.prev = 35;
                                                    _context2.t1 = _context2['catch'](27);

                                                    console.log(_context2.t1);

                                                case 38:
                                                    j++;
                                                    _context2.next = 26;
                                                    break;

                                                case 41:
                                                    _context2.next = 43;
                                                    return _post2.default.insertMany(posts);

                                                case 43:
                                                    k++;
                                                    console.log(this.login + ' : New posts to comment size : ' + (_counter2.default.posts.toComment += l));
                                                    _context2.next = 50;
                                                    break;

                                                case 47:
                                                    _context2.prev = 47;
                                                    _context2.t2 = _context2['catch'](18);

                                                    // await pagerepo.remove(explorePages[i])
                                                    console.log(_context2.t2);

                                                case 50:
                                                    _context2.next = 52;
                                                    return _page2.default.setReviewed(explorePages[i]);

                                                case 52:
                                                    i++;
                                                    _context2.next = 17;
                                                    break;

                                                case 55:
                                                    // await pagerepo.insertMany(explorePages)
                                                    console.log(this.login + ' : inserting explore pages');
                                                    return _context2.abrupt('return', resolve());

                                                case 57:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, this, [[1, 13], [18, 47], [27, 35]]);
                                }));

                                return function (_x, _x2) {
                                    return _ref3.apply(this, arguments);
                                };
                            }().bind(this)));

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function getPostsToComment() {
            return _ref2.apply(this, arguments);
        }

        return getPostsToComment;
    }(),
    savePosts: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            return _context5.abrupt('return', new Promise(function () {
                                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
                                    var pages, postsReviewed, posts, i, j, username;
                                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    pages = void 0, postsReviewed = void 0;
                                                    _context4.prev = 1;
                                                    _context4.next = 4;
                                                    return _page2.default.private(20);

                                                case 4:
                                                    pages = _context4.sent;

                                                    if (!(typeof pages === "undefined" || pages.length === 0)) {
                                                        _context4.next = 7;
                                                        break;
                                                    }

                                                    return _context4.abrupt('return', reject(this.login + ' : ERROR ON SAVING POSTS. POSTS is undefined or posts.length is 0'));

                                                case 7:
                                                    console.log(this.login + ' : Private page size is : ' + pages.length);
                                                    _context4.next = 10;
                                                    return _post2.default.reviewed();

                                                case 10:
                                                    postsReviewed = _context4.sent;

                                                    console.log(this.login + ' : Reviewed posts size is : ' + postsReviewed.length);
                                                    _context4.next = 17;
                                                    break;

                                                case 14:
                                                    _context4.prev = 14;
                                                    _context4.t0 = _context4['catch'](1);

                                                    console.log(_context4.t0);

                                                case 17:
                                                    posts = void 0;
                                                    //get new usernames

                                                    i = 0, j = 0;

                                                case 19:
                                                    if (!(j < pages.length && i < pages.length)) {
                                                        _context4.next = 40;
                                                        break;
                                                    }

                                                    username = pages[i].username;
                                                    //go to the username page

                                                    _context4.prev = 21;
                                                    _context4.next = 24;
                                                    return this.instagram.goToUsername(username);

                                                case 24:
                                                    _context4.next = 26;
                                                    return this.instagram.getNewPosts(pages[i], postsReviewed, 'analyze');

                                                case 26:
                                                    posts = _context4.sent;
                                                    _context4.next = 29;
                                                    return _post2.default.insertMany(posts);

                                                case 29:
                                                    j++;
                                                    console.log(this.login + ' : New posts to analyze size : ' + (_counter2.default.posts.toAnalyze += posts.length));
                                                    _context4.next = 35;
                                                    break;

                                                case 33:
                                                    _context4.prev = 33;
                                                    _context4.t1 = _context4['catch'](21);

                                                case 35:
                                                    _context4.next = 37;
                                                    return _page2.default.setReviewed(pages[i]);

                                                case 37:
                                                    i++;
                                                    _context4.next = 19;
                                                    break;

                                                case 40:
                                                    return _context4.abrupt('return', resolve());

                                                case 41:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, this, [[1, 14], [21, 33]]);
                                }));

                                return function (_x3, _x4) {
                                    return _ref5.apply(this, arguments);
                                };
                            }().bind(this)));

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function savePosts() {
            return _ref4.apply(this, arguments);
        }

        return savePosts;
    }(),
    analyzePosts: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', new Promise(function () {
                                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
                                    var posts, users, newUsers, i, j, postData;
                                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    posts = void 0, users = void 0;
                                                    _context6.prev = 1;
                                                    _context6.next = 4;
                                                    return _post2.default.analyze(30);

                                                case 4:
                                                    posts = _context6.sent;

                                                    if (!(typeof posts === "undefined" || posts.length === 0)) {
                                                        _context6.next = 7;
                                                        break;
                                                    }

                                                    return _context6.abrupt('return', reject(this.login + ' : ERROR ON ANALYZING POSTS. POSTS is undefined or posts.length is 0'));

                                                case 7:
                                                    console.log(this.login + ' : Posts to analyze : ' + posts.length);
                                                    _context6.next = 10;
                                                    return _user2.default.all();

                                                case 10:
                                                    _context6.t0 = _context6.sent;

                                                    if (_context6.t0) {
                                                        _context6.next = 13;
                                                        break;
                                                    }

                                                    _context6.t0 = [];

                                                case 13:
                                                    users = _context6.t0;
                                                    _context6.next = 19;
                                                    break;

                                                case 16:
                                                    _context6.prev = 16;
                                                    _context6.t1 = _context6['catch'](1);

                                                    console.log(_context6.t1);

                                                case 19:
                                                    newUsers = [];

                                                    console.log(this.login + ' : Analyzing posts.');
                                                    i = 0, j = 0;

                                                case 22:
                                                    if (!(j < posts.length && i < posts.length)) {
                                                        _context6.next = 40;
                                                        break;
                                                    }

                                                    _context6.prev = 23;
                                                    _context6.next = 26;
                                                    return this.instagram.getPostData(posts[i], users, newUsers);

                                                case 26:
                                                    postData = _context6.sent;
                                                    _context6.next = 29;
                                                    return _post2.default.setReviewed(posts[i], postData);

                                                case 29:
                                                    j++;
                                                    _context6.next = 37;
                                                    break;

                                                case 32:
                                                    _context6.prev = 32;
                                                    _context6.t2 = _context6['catch'](23);

                                                    console.log(_context6.t2);
                                                    _context6.next = 37;
                                                    return _post2.default.remove(posts[i]);

                                                case 37:
                                                    i++;
                                                    _context6.next = 22;
                                                    break;

                                                case 40:
                                                    if (!(newUsers.length > 0)) {
                                                        _context6.next = 53;
                                                        break;
                                                    }

                                                    _context6.prev = 41;
                                                    _context6.next = 44;
                                                    return _user2.default.insertMany(newUsers);

                                                case 44:
                                                    console.log(this.login + ' : ' + users.length + ' users found.');
                                                    console.log(this.login + ' : New users to analyze size : ' + (_counter2.default.users.toAnalyze += newUsers.length));
                                                    newUsers.length = 0;
                                                    users.length = 0;
                                                    _context6.next = 53;
                                                    break;

                                                case 50:
                                                    _context6.prev = 50;
                                                    _context6.t3 = _context6['catch'](41);

                                                    console.log(_context6.t3);

                                                case 53:
                                                    return _context6.abrupt('return', resolve());

                                                case 54:
                                                case 'end':
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee6, this, [[1, 16], [23, 32], [41, 50]]);
                                }));

                                return function (_x5, _x6) {
                                    return _ref7.apply(this, arguments);
                                };
                            }().bind(this)));

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function analyzePosts() {
            return _ref6.apply(this, arguments);
        }

        return analyzePosts;
    }(),
    analyzeUsers: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            return _context9.abrupt('return', new Promise(function () {
                                var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
                                    var users, i, j, type;
                                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    users = void 0;
                                                    _context8.prev = 1;
                                                    _context8.next = 4;
                                                    return _user2.default.analyze(30);

                                                case 4:
                                                    _context8.t0 = _context8.sent;

                                                    if (_context8.t0) {
                                                        _context8.next = 7;
                                                        break;
                                                    }

                                                    _context8.t0 = [];

                                                case 7:
                                                    users = _context8.t0;

                                                    if (!(typeof users === "undefined" || users.length === 0)) {
                                                        _context8.next = 10;
                                                        break;
                                                    }

                                                    return _context8.abrupt('return', reject(this.login + ' : ERROR ON ANALYZING USERS. USERS IS UNDEFINED OR USERS LENGTH IS 0'));

                                                case 10:
                                                    console.log(this.login + ' : Users  to analyze : ' + users.length);
                                                    _context8.next = 16;
                                                    break;

                                                case 13:
                                                    _context8.prev = 13;
                                                    _context8.t1 = _context8['catch'](1);

                                                    console.log(_context8.t1);

                                                case 16:
                                                    i = 0, j = 0;

                                                case 17:
                                                    if (!(j < users.length && i < users.length)) {
                                                        _context8.next = 35;
                                                        break;
                                                    }

                                                    _context8.prev = 18;
                                                    _context8.next = 21;
                                                    return this.instagram.getUserType(users[i]);

                                                case 21:
                                                    type = _context8.sent;
                                                    _context8.next = 24;
                                                    return _user2.default.setType(users[i], type);

                                                case 24:
                                                    j++;
                                                    _context8.next = 32;
                                                    break;

                                                case 27:
                                                    _context8.prev = 27;
                                                    _context8.t2 = _context8['catch'](18);

                                                    console.log(_context8.t2);
                                                    _context8.next = 32;
                                                    return _user2.default.softDelete(users[i]);

                                                case 32:
                                                    i++;
                                                    _context8.next = 17;
                                                    break;

                                                case 35:
                                                    console.log(this.login + ' : New users to analyze size : ' + (_counter2.default.users.analyzed += j));
                                                    return _context8.abrupt('return', resolve());

                                                case 37:
                                                case 'end':
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _callee8, this, [[1, 13], [18, 27]]);
                                }));

                                return function (_x7, _x8) {
                                    return _ref9.apply(this, arguments);
                                };
                            }().bind(this)));

                        case 1:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function analyzeUsers() {
            return _ref8.apply(this, arguments);
        }

        return analyzeUsers;
    }(),
    followUsers: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var users, i, j, followed;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            users = void 0;
                            _context10.prev = 1;
                            _context10.next = 4;
                            return _user2.default.follow();

                        case 4:
                            users = _context10.sent;

                            if (!(typeof users === "undefined" || users.length === 0)) {
                                _context10.next = 9;
                                break;
                            }

                            _context10.next = 8;
                            return this.instagram.sleep(config.sleepEveryIteration, true);

                        case 8:
                            return _context10.abrupt('return');

                        case 9:
                            console.log(this.login + ' : Users  to follow : ' + users.length);
                            _context10.next = 15;
                            break;

                        case 12:
                            _context10.prev = 12;
                            _context10.t0 = _context10['catch'](1);

                            console.log(_context10.t0);

                        case 15:
                            i = 0, j = 0;

                        case 16:
                            if (!(j < users.length && i < users.length)) {
                                _context10.next = 34;
                                break;
                            }

                            _context10.prev = 17;
                            _context10.next = 20;
                            return this.instagram.followUser(users[i]);

                        case 20:
                            followed = _context10.sent;
                            _context10.next = 23;
                            return _user2.default.setFollowed(users[i], this.login);

                        case 23:
                            j++;
                            _context10.next = 31;
                            break;

                        case 26:
                            _context10.prev = 26;
                            _context10.t1 = _context10['catch'](17);
                            _context10.next = 30;
                            return _user2.default.setType(users[i], 'error');

                        case 30:
                            console.log(this.login + ' : Error following: ' + users[i].username);

                        case 31:
                            i++;
                            _context10.next = 16;
                            break;

                        case 34:
                            console.log(this.login + ' : New users to follow size : ' + (_counter2.default.users.followed += j));

                        case 35:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this, [[1, 12], [17, 26]]);
        }));

        function followUsers() {
            return _ref10.apply(this, arguments);
        }

        return followUsers;
    }(),
    unfollowUsers: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
            var users, i, j, unfollowed;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            // await this.instagram.unfollowUsers();
                            users = void 0;
                            _context11.prev = 1;
                            _context11.next = 4;
                            return _user2.default.unfollow();

                        case 4:
                            users = _context11.sent;

                            if (!(typeof users === "undefined" || users.length === 0)) {
                                _context11.next = 9;
                                break;
                            }

                            _context11.next = 8;
                            return this.instagram.sleep(config.sleepEveryIteration, true);

                        case 8:
                            return _context11.abrupt('return');

                        case 9:
                            console.log(this.login + ' : Users  to unfollow : ' + users.length);
                            _context11.next = 15;
                            break;

                        case 12:
                            _context11.prev = 12;
                            _context11.t0 = _context11['catch'](1);

                            console.log(_context11.t0);

                        case 15:
                            i = 0, j = 0;

                        case 16:
                            if (!(j < users.length && i < users.length)) {
                                _context11.next = 34;
                                break;
                            }

                            _context11.prev = 17;
                            _context11.next = 20;
                            return this.instagram.unfollowUser(users[i]);

                        case 20:
                            unfollowed = _context11.sent;
                            _context11.next = 23;
                            return _user2.default.setType(users[i], 'unfollowed');

                        case 23:
                            j++;
                            _context11.next = 31;
                            break;

                        case 26:
                            _context11.prev = 26;
                            _context11.t1 = _context11['catch'](17);
                            _context11.next = 30;
                            return _user2.default.setType(users[i], 'error');

                        case 30:
                            console.log(this.login + ' : Error unfollowing: ' + users[i].username);

                        case 31:
                            i++;
                            _context11.next = 16;
                            break;

                        case 34:
                            console.log(this.login + ' : New users to unfollow size : ' + (_counter2.default.users.unfollowed += j));

                        case 35:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this, [[1, 12], [17, 26]]);
        }));

        function unfollowUsers() {
            return _ref11.apply(this, arguments);
        }

        return unfollowUsers;
    }(),
    likeUserPosts: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
            var users, i, j;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            users = void 0;
                            _context12.prev = 1;
                            _context12.next = 4;
                            return _user2.default.like();

                        case 4:
                            users = _context12.sent;

                            if (!(typeof users === "undefined" || users.length === 0)) {
                                _context12.next = 9;
                                break;
                            }

                            _context12.next = 8;
                            return this.instagram.sleep(config.sleepEveryIteration, true);

                        case 8:
                            return _context12.abrupt('return');

                        case 9:
                            console.log(this.login + ' : Users to like : ' + users.length);
                            _context12.next = 15;
                            break;

                        case 12:
                            _context12.prev = 12;
                            _context12.t0 = _context12['catch'](1);

                            console.log(_context12.t0);

                        case 15:
                            i = 0, j = 0;

                        case 16:
                            if (!(j < users.length && i < users.length)) {
                                _context12.next = 33;
                                break;
                            }

                            _context12.prev = 17;
                            _context12.next = 20;
                            return this.instagram.likeUserPosts(users[i]);

                        case 20:
                            _context12.next = 22;
                            return _user2.default.setType(users[i], 'liked');

                        case 22:
                            j++;
                            _context12.next = 30;
                            break;

                        case 25:
                            _context12.prev = 25;
                            _context12.t1 = _context12['catch'](17);
                            _context12.next = 29;
                            return _user2.default.softDelete(users[i]);

                        case 29:
                            console.log(this.login + ' : Soft deleted: ' + users[i].username);

                        case 30:
                            i++;
                            _context12.next = 16;
                            break;

                        case 33:
                            console.log(this.login + ' : Liked users size : ' + (_counter2.default.users.liked += j));

                        case 34:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, this, [[1, 12], [17, 25]]);
        }));

        function likeUserPosts() {
            return _ref12.apply(this, arguments);
        }

        return likeUserPosts;
    }(),
    commentPosts: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
            var posts, i, j;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            posts = void 0;
                            _context13.prev = 1;
                            _context13.next = 4;
                            return _post2.default.comment();

                        case 4:
                            posts = _context13.sent;

                            if (!(typeof posts === "undefined" || posts.length === 0)) {
                                _context13.next = 9;
                                break;
                            }

                            _context13.next = 8;
                            return this.instagram.sleep(config.sleepEveryIteration, true);

                        case 8:
                            return _context13.abrupt('return');

                        case 9:
                            console.log(this.login + ' : Posts to comment : ' + posts.length);
                            _context13.next = 15;
                            break;

                        case 12:
                            _context13.prev = 12;
                            _context13.t0 = _context13['catch'](1);

                            console.log(_context13.t0);

                        case 15:
                            i = 0, j = 0;

                        case 16:
                            if (!(j < posts.length && i < posts.length)) {
                                _context13.next = 35;
                                break;
                            }

                            _context13.prev = 17;

                            console.log(this.login + ' : Commenting ' + (i + 1) + ' of ' + posts.length + ' posts.');
                            _context13.next = 21;
                            return this.instagram.commentPosts(posts[i]);

                        case 21:
                            _context13.next = 23;
                            return _post2.default.setType(posts[i], 'commented');

                        case 23:
                            _context13.next = 25;
                            return _page2.default.setCommented(posts[i].page[0]);

                        case 25:
                            j++;
                            _context13.next = 32;
                            break;

                        case 28:
                            _context13.prev = 28;
                            _context13.t1 = _context13['catch'](17);
                            _context13.next = 32;
                            return _post2.default.remove(posts[i]);

                        case 32:
                            i++;
                            _context13.next = 16;
                            break;

                        case 35:
                            console.log(this.login + ' : Commented posts size : ' + (_counter2.default.posts.commented += j));

                        case 36:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this, [[1, 12], [17, 28]]);
        }));

        function commentPosts() {
            return _ref13.apply(this, arguments);
        }

        return commentPosts;
    }()
};