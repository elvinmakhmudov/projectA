'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var Action = function () {
    function Action(counter, login, password, comments) {
        _classCallCheck(this, Action);

        this.login = login;
        this.counter = counter;
        this.instagram = new _InstagramAPI2.default(login, password, comments).init();
        this.logger = new _logger2.default(login);
    }

    _createClass(Action, [{
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
        key: 'logIn',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.instagram.logIn();

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function logIn() {
                return _ref2.apply(this, arguments);
            }

            return logIn;
        }()
    }, {
        key: 'sleep',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(seconds, log) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.instagram.sleep(seconds, log);

                            case 2:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function sleep(_x, _x2) {
                return _ref3.apply(this, arguments);
            }

            return sleep;
        }()
    }, {
        key: 'findNewPages',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var postsReviewed, allPages, oldExplorePages, explorePages;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _post2.default.reviewed();

                            case 2:
                                postsReviewed = _context4.sent;
                                _context4.next = 5;
                                return _page2.default.all();

                            case 5:
                                allPages = _context4.sent;
                                _context4.next = 8;
                                return _page2.default.explore();

                            case 8:
                                oldExplorePages = _context4.sent;
                                _context4.next = 11;
                                return this.instagram.goToUsername(!(typeof oldExplorePages === "undefined") && oldExplorePages.length !== 0 ? oldExplorePages[Math.floor(Math.random() * oldExplorePages.length)].username : "qizlargramm");

                            case 11:
                                _context4.next = 13;
                                return this.instagram.explorePage(allPages);

                            case 13:
                                explorePages = _context4.sent;

                                if (!(explorePages.length > 0)) {
                                    _context4.next = 20;
                                    break;
                                }

                                _context4.next = 17;
                                return _page2.default.insertMany(explorePages);

                            case 17:
                                this.counter.pages.explored++;
                                _context4.next = 21;
                                break;

                            case 20:
                                throw 'NEW PAGES HAVE NOT BEEN FOUND';

                            case 21:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function findNewPages() {
                return _ref4.apply(this, arguments);
            }

            return findNewPages;
        }()
    }, {
        key: 'getPostsToComment',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                return _context6.abrupt('return', new Promise(function () {
                                    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
                                        var explorePages, oldPosts, i, k, freshPosts, posts, j, l, d, yesterdayInMseconds, data;
                                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        explorePages = void 0;
                                                        _context5.prev = 1;
                                                        _context5.next = 4;
                                                        return _page2.default.explore(10);

                                                    case 4:
                                                        explorePages = _context5.sent;

                                                        if (!(typeof explorePages === "undefined" || explorePages.length === 0)) {
                                                            _context5.next = 7;
                                                            break;
                                                        }

                                                        return _context5.abrupt('return', reject('ERROR ON GETTINGS POSTS TO COMMENT. EXPLORE PAGES is undefined or explorepages.length is 0'));

                                                    case 7:
                                                        this.logger.update('Pages to explore : ' + explorePages.length);
                                                        _context5.next = 10;
                                                        return _post2.default.explore();

                                                    case 10:
                                                        oldPosts = _context5.sent;
                                                        _context5.next = 16;
                                                        break;

                                                    case 13:
                                                        _context5.prev = 13;
                                                        _context5.t0 = _context5['catch'](1);

                                                        this.logger.update(_context5.t0);

                                                    case 16:
                                                        i = 0, k = 0;

                                                    case 17:
                                                        if (!(k < explorePages.length && i < explorePages.length)) {
                                                            _context5.next = 62;
                                                            break;
                                                        }

                                                        freshPosts = [];
                                                        _context5.prev = 19;
                                                        _context5.next = 22;
                                                        return this.instagram.goToUsername(explorePages[i].username);

                                                    case 22:
                                                        _context5.next = 24;
                                                        return this.instagram.getNewPosts(explorePages[i], oldPosts, 'comment');

                                                    case 24:
                                                        posts = _context5.sent;

                                                        this.logger.update('posts length is : ' + posts.length);
                                                        j = 0, l = 0;

                                                    case 27:
                                                        if (!(j < posts.length && l < posts.length)) {
                                                            _context5.next = 48;
                                                            break;
                                                        }

                                                        _context5.prev = 28;

                                                        //set yesterday since epoch in mseconds
                                                        d = new Date();
                                                        yesterdayInMseconds = d.setDate(d.getDate() - 3);
                                                        _context5.next = 33;
                                                        return this.instagram.getRatingAndDate(posts[j]);

                                                    case 33:
                                                        data = _context5.sent;

                                                        posts[j].rating = data.rating;
                                                        posts[j].date = data.date;
                                                        //if post is old, skip it

                                                        if (!(data.date < yesterdayInMseconds)) {
                                                            _context5.next = 38;
                                                            break;
                                                        }

                                                        return _context5.abrupt('continue', 45);

                                                    case 38:
                                                        freshPosts.push(posts[j]);
                                                        l++;
                                                        _context5.next = 45;
                                                        break;

                                                    case 42:
                                                        _context5.prev = 42;
                                                        _context5.t1 = _context5['catch'](28);

                                                        this.logger.update(_context5.t1);

                                                    case 45:
                                                        j++;
                                                        _context5.next = 27;
                                                        break;

                                                    case 48:
                                                        if (!(freshPosts.length > 0)) {
                                                            _context5.next = 52;
                                                            break;
                                                        }

                                                        _context5.next = 51;
                                                        return _post2.default.insertMany(freshPosts);

                                                    case 51:
                                                        k++;

                                                    case 52:
                                                        _context5.next = 57;
                                                        break;

                                                    case 54:
                                                        _context5.prev = 54;
                                                        _context5.t2 = _context5['catch'](19);

                                                        // await pagerepo.remove(explorePages[i])
                                                        this.logger.update(_context5.t2);

                                                    case 57:
                                                        _context5.next = 59;
                                                        return _page2.default.setReviewed(explorePages[i]);

                                                    case 59:
                                                        i++;
                                                        _context5.next = 17;
                                                        break;

                                                    case 62:
                                                        // await pagerepo.insertMany(explorePages)
                                                        this.logger.update('Inserting explore pages');
                                                        return _context5.abrupt('return', resolve());

                                                    case 64:
                                                    case 'end':
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, this, [[1, 13], [19, 54], [28, 42]]);
                                    }));

                                    return function (_x3, _x4) {
                                        return _ref6.apply(this, arguments);
                                    };
                                }().bind(this)));

                            case 1:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getPostsToComment() {
                return _ref5.apply(this, arguments);
            }

            return getPostsToComment;
        }()
    }, {
        key: 'savePosts',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                return _context8.abrupt('return', new Promise(function () {
                                    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
                                        var pages, postsReviewed, posts, i, j, username;
                                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                            while (1) {
                                                switch (_context7.prev = _context7.next) {
                                                    case 0:
                                                        pages = void 0, postsReviewed = void 0;
                                                        _context7.prev = 1;
                                                        _context7.next = 4;
                                                        return _page2.default.private(20);

                                                    case 4:
                                                        pages = _context7.sent;

                                                        if (!(typeof pages === "undefined" || pages.length === 0)) {
                                                            _context7.next = 7;
                                                            break;
                                                        }

                                                        return _context7.abrupt('return', reject(this.instagram.login + ' : ERROR ON SAVING POSTS. POSTS is undefined or posts.length is 0'));

                                                    case 7:
                                                        this.logger.update('Private page size is : ' + pages.length);
                                                        _context7.next = 10;
                                                        return _post2.default.reviewed();

                                                    case 10:
                                                        postsReviewed = _context7.sent;

                                                        this.logger.update('Reviewed posts size is : ' + postsReviewed.length);
                                                        _context7.next = 17;
                                                        break;

                                                    case 14:
                                                        _context7.prev = 14;
                                                        _context7.t0 = _context7['catch'](1);

                                                        this.logger.update(_context7.t0);

                                                    case 17:
                                                        posts = void 0;
                                                        //get new usernames

                                                        i = 0, j = 0;

                                                    case 19:
                                                        if (!(j < pages.length && i < pages.length)) {
                                                            _context7.next = 39;
                                                            break;
                                                        }

                                                        username = pages[i].username;
                                                        //go to the username page

                                                        _context7.prev = 21;
                                                        _context7.next = 24;
                                                        return this.instagram.goToUsername(username);

                                                    case 24:
                                                        _context7.next = 26;
                                                        return this.instagram.getNewPosts(pages[i], postsReviewed, 'analyze');

                                                    case 26:
                                                        posts = _context7.sent;
                                                        _context7.next = 29;
                                                        return _post2.default.insertMany(posts);

                                                    case 29:
                                                        j++;
                                                        _context7.next = 34;
                                                        break;

                                                    case 32:
                                                        _context7.prev = 32;
                                                        _context7.t1 = _context7['catch'](21);

                                                    case 34:
                                                        _context7.next = 36;
                                                        return _page2.default.setReviewed(pages[i]);

                                                    case 36:
                                                        i++;
                                                        _context7.next = 19;
                                                        break;

                                                    case 39:
                                                        return _context7.abrupt('return', resolve());

                                                    case 40:
                                                    case 'end':
                                                        return _context7.stop();
                                                }
                                            }
                                        }, _callee7, this, [[1, 14], [21, 32]]);
                                    }));

                                    return function (_x5, _x6) {
                                        return _ref8.apply(this, arguments);
                                    };
                                }().bind(this)));

                            case 1:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function savePosts() {
                return _ref7.apply(this, arguments);
            }

            return savePosts;
        }()
    }, {
        key: 'analyzePosts',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                return _context10.abrupt('return', new Promise(function () {
                                    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
                                        var posts, users, newUsers, i, j, postData;
                                        return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                            while (1) {
                                                switch (_context9.prev = _context9.next) {
                                                    case 0:
                                                        posts = void 0, users = void 0;
                                                        _context9.prev = 1;
                                                        _context9.next = 4;
                                                        return _post2.default.analyze(20);

                                                    case 4:
                                                        posts = _context9.sent;

                                                        if (!(typeof posts === "undefined" || posts.length === 0)) {
                                                            _context9.next = 7;
                                                            break;
                                                        }

                                                        return _context9.abrupt('return', reject(this.instagram.login + ' : ERROR ON ANALYZING POSTS. POSTS is undefined or posts.length is 0'));

                                                    case 7:
                                                        this.logger.update('Posts to analyze : ' + posts.length);
                                                        _context9.next = 10;
                                                        return _user2.default.all();

                                                    case 10:
                                                        _context9.t0 = _context9.sent;

                                                        if (_context9.t0) {
                                                            _context9.next = 13;
                                                            break;
                                                        }

                                                        _context9.t0 = [];

                                                    case 13:
                                                        users = _context9.t0;
                                                        _context9.next = 19;
                                                        break;

                                                    case 16:
                                                        _context9.prev = 16;
                                                        _context9.t1 = _context9['catch'](1);

                                                        this.logger.update(_context9.t1);

                                                    case 19:
                                                        newUsers = [];

                                                        this.logger.update('Analyzing posts.');
                                                        i = 0, j = 0;

                                                    case 22:
                                                        if (!(j < posts.length && i < posts.length)) {
                                                            _context9.next = 40;
                                                            break;
                                                        }

                                                        _context9.prev = 23;
                                                        _context9.next = 26;
                                                        return this.instagram.getPostData(posts[i], users, newUsers);

                                                    case 26:
                                                        postData = _context9.sent;
                                                        _context9.next = 29;
                                                        return _post2.default.setReviewed(posts[i], postData);

                                                    case 29:
                                                        j++;
                                                        _context9.next = 37;
                                                        break;

                                                    case 32:
                                                        _context9.prev = 32;
                                                        _context9.t2 = _context9['catch'](23);

                                                        this.logger.update(_context9.t2);
                                                        _context9.next = 37;
                                                        return _post2.default.remove(posts[i]);

                                                    case 37:
                                                        i++;
                                                        _context9.next = 22;
                                                        break;

                                                    case 40:
                                                        if (!(newUsers.length > 0)) {
                                                            _context9.next = 51;
                                                            break;
                                                        }

                                                        _context9.prev = 41;
                                                        _context9.next = 44;
                                                        return _user2.default.insertMany(newUsers);

                                                    case 44:
                                                        // this.logger.update(users.length + ' users found.');
                                                        // this.logger.update('New users to analyze size : ' + (this.counter.users.toAnalyze +=j));
                                                        newUsers.length = 0;
                                                        users.length = 0;
                                                        _context9.next = 51;
                                                        break;

                                                    case 48:
                                                        _context9.prev = 48;
                                                        _context9.t3 = _context9['catch'](41);

                                                        this.logger.update(_context9.t3);

                                                    case 51:
                                                        return _context9.abrupt('return', resolve());

                                                    case 52:
                                                    case 'end':
                                                        return _context9.stop();
                                                }
                                            }
                                        }, _callee9, this, [[1, 16], [23, 32], [41, 48]]);
                                    }));

                                    return function (_x7, _x8) {
                                        return _ref10.apply(this, arguments);
                                    };
                                }().bind(this)));

                            case 1:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function analyzePosts() {
                return _ref9.apply(this, arguments);
            }

            return analyzePosts;
        }()
    }, {
        key: 'analyzeUsers',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                return _context12.abrupt('return', new Promise(function () {
                                    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(resolve, reject) {
                                        var users, i, j, type;
                                        return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                            while (1) {
                                                switch (_context11.prev = _context11.next) {
                                                    case 0:
                                                        users = void 0;
                                                        _context11.prev = 1;
                                                        _context11.next = 4;
                                                        return _user2.default.analyze(20);

                                                    case 4:
                                                        _context11.t0 = _context11.sent;

                                                        if (_context11.t0) {
                                                            _context11.next = 7;
                                                            break;
                                                        }

                                                        _context11.t0 = [];

                                                    case 7:
                                                        users = _context11.t0;

                                                        if (!(typeof users === "undefined" || users.length === 0)) {
                                                            _context11.next = 10;
                                                            break;
                                                        }

                                                        return _context11.abrupt('return', reject(this.instagram.login + ' : ERROR ON ANALYZING USERS. USERS IS UNDEFINED OR USERS LENGTH IS 0'));

                                                    case 10:
                                                        this.logger.update('Users  to analyze : ' + users.length);
                                                        _context11.next = 16;
                                                        break;

                                                    case 13:
                                                        _context11.prev = 13;
                                                        _context11.t1 = _context11['catch'](1);

                                                        this.logger.update(_context11.t1);

                                                    case 16:
                                                        this.logger.update('Analyzing users');
                                                        i = 0, j = 0;

                                                    case 18:
                                                        if (!(j < users.length && i < users.length)) {
                                                            _context11.next = 36;
                                                            break;
                                                        }

                                                        _context11.prev = 19;
                                                        _context11.next = 22;
                                                        return this.instagram.getUserType(users[i]);

                                                    case 22:
                                                        type = _context11.sent;
                                                        _context11.next = 25;
                                                        return _user2.default.setType(users[i], type);

                                                    case 25:
                                                        j++;
                                                        _context11.next = 33;
                                                        break;

                                                    case 28:
                                                        _context11.prev = 28;
                                                        _context11.t2 = _context11['catch'](19);

                                                        this.logger.update(_context11.t2);
                                                        _context11.next = 33;
                                                        return _user2.default.softDelete(users[i]);

                                                    case 33:
                                                        i++;
                                                        _context11.next = 18;
                                                        break;

                                                    case 36:
                                                        this.logger.update('New users to analyze size : ' + (this.counter.users.analyzed += j));
                                                        return _context11.abrupt('return', resolve());

                                                    case 38:
                                                    case 'end':
                                                        return _context11.stop();
                                                }
                                            }
                                        }, _callee11, this, [[1, 13], [19, 28]]);
                                    }));

                                    return function (_x9, _x10) {
                                        return _ref12.apply(this, arguments);
                                    };
                                }().bind(this)));

                            case 1:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function analyzeUsers() {
                return _ref11.apply(this, arguments);
            }

            return analyzeUsers;
        }()
    }, {
        key: 'followUsers',
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                var users, errors, i, j, followed;
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                users = void 0;
                                _context13.next = 3;
                                return _user2.default.follow();

                            case 3:
                                users = _context13.sent;

                                if (!(typeof users === "undefined" || users.length === 0)) {
                                    _context13.next = 7;
                                    break;
                                }

                                throw 'ERROR ON FOLLOWING USERS. USERS IS UNDEFINED OR USERS LENGTH IS 0';

                            case 7:
                                this.logger.update('Users  to follow : ' + users.length);
                                errors = 0;
                                i = 0, j = 0;

                            case 10:
                                if (!(j < users.length && i < users.length)) {
                                    _context13.next = 33;
                                    break;
                                }

                                _context13.prev = 11;

                                if (!(errors >= config.maxErrors)) {
                                    _context13.next = 16;
                                    break;
                                }

                                _context13.next = 15;
                                return this.sleep(config.sleepEveryIteration, true);

                            case 15:
                                return _context13.abrupt('break', 33);

                            case 16:
                                _context13.next = 18;
                                return this.instagram.followUser(users[i]);

                            case 18:
                                followed = _context13.sent;
                                _context13.next = 21;
                                return _user2.default.setFollowed(users[i], this.instagram.login);

                            case 21:
                                j++;
                                _context13.next = 30;
                                break;

                            case 24:
                                _context13.prev = 24;
                                _context13.t0 = _context13['catch'](11);
                                _context13.next = 28;
                                return _user2.default.setType(users[i], 'error');

                            case 28:
                                this.logger.update('Error following: ' + users[i].username);
                                errors++;

                            case 30:
                                i++;
                                _context13.next = 10;
                                break;

                            case 33:
                                this.logger.update('New users to follow size : ' + (this.counter.users.followed += j));

                            case 34:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, this, [[11, 24]]);
            }));

            function followUsers() {
                return _ref13.apply(this, arguments);
            }

            return followUsers;
        }()
    }, {
        key: 'unfollowUsers',
        value: function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                var users, errors, i, j, unfollowed;
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                // await this.instagram.unfollowUsers();
                                users = void 0;
                                _context14.next = 3;
                                return _user2.default.unfollow(this.login);

                            case 3:
                                users = _context14.sent;

                                if (!(typeof users === "undefined" || users.length === 0)) {
                                    _context14.next = 7;
                                    break;
                                }

                                throw 'ERROR ON UNFOLLOWING USERS. USERS IS UNDEFINED OR USERS LENGTH IS 0';

                            case 7:
                                this.logger.update('Users  to unfollow : ' + users.length);
                                errors = 0;
                                i = 0, j = 0;

                            case 10:
                                if (!(j < users.length && i < users.length)) {
                                    _context14.next = 33;
                                    break;
                                }

                                _context14.prev = 11;

                                if (!(errors >= config.maxErrors)) {
                                    _context14.next = 16;
                                    break;
                                }

                                _context14.next = 15;
                                return this.sleep(config.sleepEveryIteration, true);

                            case 15:
                                return _context14.abrupt('break', 33);

                            case 16:
                                _context14.next = 18;
                                return this.instagram.unfollowUser(users[i]);

                            case 18:
                                unfollowed = _context14.sent;
                                _context14.next = 21;
                                return _user2.default.setType(users[i], 'unfollowed');

                            case 21:
                                j++;
                                _context14.next = 30;
                                break;

                            case 24:
                                _context14.prev = 24;
                                _context14.t0 = _context14['catch'](11);
                                _context14.next = 28;
                                return _user2.default.setType(users[i], 'error');

                            case 28:
                                this.logger.update('Error unfollowing: ' + users[i].username);
                                errors++;

                            case 30:
                                i++;
                                _context14.next = 10;
                                break;

                            case 33:
                                this.logger.update('New users to unfollow size : ' + (this.counter.users.unfollowed += j));

                            case 34:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, this, [[11, 24]]);
            }));

            function unfollowUsers() {
                return _ref14.apply(this, arguments);
            }

            return unfollowUsers;
        }()
    }, {
        key: 'likeUserPosts',
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
                var users, errors, i, j;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                users = void 0;
                                _context15.next = 3;
                                return _user2.default.like();

                            case 3:
                                users = _context15.sent;

                                if (!(typeof users === "undefined" || users.length === 0)) {
                                    _context15.next = 7;
                                    break;
                                }

                                throw 'ERROR ON LIKING USERS. USERS IS UNDEFINED OR USERS LENGTH IS 0';

                            case 7:
                                this.logger.update(this, 'Users to like : ' + users.length);
                                errors = 0;
                                i = 0, j = 0;

                            case 10:
                                if (!(j < users.length && i < users.length)) {
                                    _context15.next = 32;
                                    break;
                                }

                                _context15.prev = 11;

                                if (!(errors >= config.maxErrors)) {
                                    _context15.next = 16;
                                    break;
                                }

                                _context15.next = 15;
                                return this.sleep(config.sleepEveryIteration, true);

                            case 15:
                                return _context15.abrupt('break', 32);

                            case 16:
                                _context15.next = 18;
                                return this.instagram.likeUserPosts(users[i]);

                            case 18:
                                _context15.next = 20;
                                return _user2.default.setType(users[i], 'liked');

                            case 20:
                                j++;
                                _context15.next = 29;
                                break;

                            case 23:
                                _context15.prev = 23;
                                _context15.t0 = _context15['catch'](11);
                                _context15.next = 27;
                                return _user2.default.softDelete(users[i]);

                            case 27:
                                this.logger.update('Soft deleted: ' + users[i].username);
                                errors++;

                            case 29:
                                i++;
                                _context15.next = 10;
                                break;

                            case 32:
                                this.logger.update('Liked users size : ' + (this.counter.users.liked += j));

                            case 33:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee15, this, [[11, 23]]);
            }));

            function likeUserPosts() {
                return _ref15.apply(this, arguments);
            }

            return likeUserPosts;
        }()
    }, {
        key: 'commentPosts',
        value: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
                var posts, errors, i, j;
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                posts = void 0;
                                _context16.next = 3;
                                return _post2.default.comment();

                            case 3:
                                posts = _context16.sent;

                                if (!(typeof posts === "undefined" || posts.length === 0)) {
                                    _context16.next = 7;
                                    break;
                                }

                                throw 'ERROR ON COMMENTING POSTS. POSTS IS UNDEFINED OR POSTS LENGTH IS 0';

                            case 7:
                                this.logger.update('Posts to comment : ' + posts.length);
                                errors = 0;
                                i = 0, j = 0;

                            case 10:
                                if (!(j < posts.length && i < posts.length)) {
                                    _context16.next = 32;
                                    break;
                                }

                                _context16.prev = 11;

                                if (!(errors >= config.maxErrors)) {
                                    _context16.next = 16;
                                    break;
                                }

                                _context16.next = 15;
                                return this.sleep(config.sleepEveryIteration, true);

                            case 15:
                                return _context16.abrupt('break', 32);

                            case 16:
                                this.logger.update('Commenting ' + (i + 1) + ' of ' + posts.length + ' posts.');
                                _context16.next = 19;
                                return this.instagram.commentPosts(posts[i]);

                            case 19:
                                _context16.next = 21;
                                return _post2.default.setType(posts[i], 'commented');

                            case 21:
                                // await pagerepo.setCommented(posts[i].page[0]);
                                j++;
                                _context16.next = 29;
                                break;

                            case 24:
                                _context16.prev = 24;
                                _context16.t0 = _context16['catch'](11);
                                _context16.next = 28;
                                return _post2.default.remove(posts[i]);

                            case 28:
                                errors++;

                            case 29:
                                i++;
                                _context16.next = 10;
                                break;

                            case 32:
                                this.logger.update('Commented posts size : ' + (this.counter.posts.commented += j));

                            case 33:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, _callee16, this, [[11, 24]]);
            }));

            function commentPosts() {
                return _ref16.apply(this, arguments);
            }

            return commentPosts;
        }()
    }]);

    return Action;
}();

exports.default = Action;