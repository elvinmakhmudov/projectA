'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chrome = require('selenium-webdriver/chrome');

var _chrome2 = _interopRequireDefault(_chrome);

var _database = require('./database/database.js');

var _database2 = _interopRequireDefault(_database);

var _page = require('./models/page');

var _page2 = _interopRequireDefault(_page);

var _post = require('./models/post');

var _post2 = _interopRequireDefault(_post);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _cookie = require('./models/cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _analyzator = require('./analyzator.js');

var _analyzator2 = _interopRequireDefault(_analyzator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var _require = require('selenium-webdriver'),
    Builder = _require.Builder,
    By = _require.By,
    until = _require.until;

var InstagramAPI = function () {
    function InstagramAPI(login, password) {
        _classCallCheck(this, InstagramAPI);

        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
    }

    _createClass(InstagramAPI, [{
        key: 'init',
        value: function init() {
            var options = config.headless ? new _chrome2.default.Options().headless() : new _chrome2.default.Options();
            this.driver = new Builder().forBrowser(config.browser).setChromeOptions(options).build();
            this.dbase = _database2.default.init();
            return this;
        }
    }, {
        key: 'logIn',
        value: function logIn() {
            return new Promise(function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                    var driver, cookies;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    driver = this.driver;
                                    _context.next = 3;
                                    return driver.get(config.urls.login);

                                case 3:
                                    _context.next = 5;
                                    return _cookie2.default.find({
                                        username: config.instagram.login
                                    });

                                case 5:
                                    cookies = _context.sent;

                                    if (!(cookies.length !== 0)) {
                                        _context.next = 11;
                                        break;
                                    }

                                    _context.next = 9;
                                    return this.cookieLogIn(cookies).then(function () {
                                        console.log('Logged in with Cookies');
                                        resolve();
                                    });

                                case 9:
                                    _context.next = 24;
                                    break;

                                case 11:
                                    _context.next = 13;
                                    return driver.wait(until.elementLocated(By.name("username")), config.timeout);

                                case 13:
                                    _context.next = 15;
                                    return driver.findElement(By.name('username')).sendKeys(this.login);

                                case 15:
                                    _context.next = 17;
                                    return driver.findElement(By.name('password')).sendKeys(this.password);

                                case 17:
                                    _context.next = 19;
                                    return driver.findElement(By.className('_qv64e _gexxb _4tgw8 _njrw0')).click();

                                case 19:
                                    _context.next = 21;
                                    return driver.sleep(2000).then(function () {
                                        return resolve();
                                    });

                                case 21:
                                    console.log('Logged in');
                                    //set cookies 
                                    _context.next = 24;
                                    return this.setCookies(this.login);

                                case 24:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }().bind(this));
        }
    }, {
        key: 'cookieLogIn',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(cookies) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt('return', new Promise(function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                                        var i;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (!(cookies.length !== 0)) {
                                                            _context2.next = 9;
                                                            break;
                                                        }

                                                        i = 0;

                                                    case 2:
                                                        if (!(i < cookies.length)) {
                                                            _context2.next = 8;
                                                            break;
                                                        }

                                                        _context2.next = 5;
                                                        return this.driver.manage().addCookie(JSON.parse(cookies[i].cookies));

                                                    case 5:
                                                        i++;
                                                        _context2.next = 2;
                                                        break;

                                                    case 8:
                                                        resolve();

                                                    case 9:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, this);
                                    }));

                                    return function (_x3, _x4) {
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

            function cookieLogIn(_x2) {
                return _ref2.apply(this, arguments);
            }

            return cookieLogIn;
        }()
    }, {
        key: 'setCookies',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(username) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.abrupt('return', new Promise(function () {
                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
                                        var cookies, cookiesArr, i;
                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.next = 2;
                                                        return this.driver.manage().getCookies();

                                                    case 2:
                                                        cookies = _context4.sent;
                                                        cookiesArr = [];

                                                        for (i = 0; i < cookies.length; i++) {
                                                            cookiesArr.push(new _cookie2.default({
                                                                username: username,
                                                                cookies: JSON.stringify(cookies[i])
                                                            }));
                                                        }
                                                        _context4.next = 7;
                                                        return _cookie2.default.find({
                                                            username: username
                                                        }).remove().exec();

                                                    case 7:
                                                        _context4.next = 9;
                                                        return _cookie2.default.insertMany(cookiesArr, function () {
                                                            return console.log('Cookie collection was populated');
                                                        });

                                                    case 9:
                                                        resolve();

                                                    case 10:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, this);
                                    }));

                                    return function (_x6, _x7) {
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

            function setCookies(_x5) {
                return _ref4.apply(this, arguments);
            }

            return setCookies;
        }()
    }, {
        key: 'goToProfile',
        value: function goToProfile() {
            return new Promise(function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.next = 2;
                                    return this.driver.get(config.urls.main);

                                case 2:
                                    _context6.next = 4;
                                    return this.driver.wait(until.elementLocated(By.className('coreSpriteDesktopNavProfile')), config.timeout);

                                case 4:
                                    _context6.next = 6;
                                    return this.driver.findElement(By.className('coreSpriteDesktopNavProfile')).click().then(function () {
                                        return resolve();
                                    });

                                case 6:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this);
                }));

                return function (_x8) {
                    return _ref6.apply(this, arguments);
                };
            }().bind(this));
        }
    }, {
        key: 'getAndSaveFollowings',
        value: function getAndSaveFollowings() {
            return new Promise(function (resolve) {
                this.driver.wait(until.elementLocated(By.partialLinkText('following')), config.timeout);
                this.driver.sleep(2000);
                this.driver.findElement(By.partialLinkText('following')).click();
                this.driver.sleep(2000);
                console.log('Getting followings');
                var scrollElement = this.driver.wait(until.elementLocated(By.className('_2g7d5 notranslate _o5iw8')), config.timeout);
                scrollElement.then(function () {
                    this.scrollFollowings(0).then(function () {
                        this.driver.findElements(By.className('_2g7d5 notranslate _o5iw8')).then(function (followings) {
                            var followingsArr = [];
                            for (var i = 0; i < followings.length; i++) {
                                followings[i].getText().then(function (following) {
                                    followingsArr.push(new _page2.default({
                                        'username': following,
                                        'type': 'private'
                                    }));
                                    if (followingsArr.length === followings.length) {
                                        _page2.default.collection.drop({}, function () {
                                            return console.log('Collection was cleared');
                                        });
                                        _page2.default.insertMany(followingsArr, function () {
                                            return console.log('Collection was populated');
                                        });
                                        resolve();
                                    }
                                }.bind(this));
                            }
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }
    }, {
        key: 'scrollFollowings',
        value: function scrollFollowings(scrollTop) {
            return new Promise(function (resolve) {
                var scrolled = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;');
                this.driver.sleep(1000);
                scrolled.then(function () {
                    var currentScroll = this.driver.executeScript('var objDiv = document.getElementsByClassName("_gs38e")[0];objDiv.scrollTop = objDiv.scrollHeight;return objDiv.scrollTop;').then(function (current) {
                        if (scrollTop !== current) {
                            this.driver.sleep(500);
                            return this.scrollFollowings(current).then(function () {
                                return resolve();
                            }.bind(this));
                        } else {
                            return resolve();
                        }
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }
    }, {
        key: 'getPrivatePages',
        value: function getPrivatePages() {
            var d = new Date();
            d.setDate(d.getDate() - config.oldestPageInDays);
            var yesterdayInMseconds = Date.now() - d.getMilliseconds();
            //IN PROD CHANGE $lt TO $gt
            return _page2.default.find({
                reviewed: false,
                reviewed_at: {
                    $lt: yesterdayInMseconds
                },
                type: 'private'
            });
        }
    }, {
        key: 'goToUsername',
        value: function goToUsername(username) {
            console.log('Reviewing ' + username);
            return this.driver.get(config.urls.main + username);
        }
    }, {
        key: 'savePostsToAnalyze',
        value: function savePostsToAnalyze(username) {
            return new Promise(function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
                    var posts, postsArr, i, href;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.next = 2;
                                    return this.driver.findElements(By.className("_kcrwx"));

                                case 2:
                                    _context7.t0 = _context7.sent;

                                    if (!(_context7.t0 != 0)) {
                                        _context7.next = 5;
                                        break;
                                    }

                                    return _context7.abrupt('return', resolve());

                                case 5:
                                    this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
                                    _context7.next = 8;
                                    return this.driver.findElements(By.css('._mck9w a'));

                                case 8:
                                    posts = _context7.sent;
                                    postsArr = [];
                                    i = 0;

                                case 11:
                                    if (!(i < posts.length)) {
                                        _context7.next = 24;
                                        break;
                                    }

                                    _context7.next = 14;
                                    return posts[i].getAttribute('href');

                                case 14:
                                    href = _context7.sent;

                                    postsArr.push(new _post2.default({
                                        'url': href,
                                        'username': username,
                                        'type': 'analyze'
                                    }));

                                    if (!(postsArr.length === posts.length)) {
                                        _context7.next = 21;
                                        break;
                                    }

                                    _page2.default.update({
                                        username: username
                                    }, {
                                        $set: {
                                            reviewed: true,
                                            reviewed_at: Date.now()
                                        }
                                    });
                                    _context7.next = 20;
                                    return _post2.default.insertMany(postsArr, function () {
                                        return console.log(posts.length + ' posts were added');
                                    });

                                case 20:
                                    resolve();

                                case 21:
                                    i++;
                                    _context7.next = 11;
                                    break;

                                case 24:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this);
                }));

                return function (_x9, _x10) {
                    return _ref7.apply(this, arguments);
                };
            }().bind(this));
        }
    }, {
        key: 'getNewUsers',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee10$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.prev = 0;
                                return _context11.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                                    var posts, users, newUsers, i, comments, likes, dateattr, datetime, rating, _loop, j;

                                    return regeneratorRuntime.wrap(function _callee9$(_context10) {
                                        while (1) {
                                            switch (_context10.prev = _context10.next) {
                                                case 0:
                                                    _context10.next = 2;
                                                    return _post2.default.find({
                                                        type: 'analyze'
                                                    });

                                                case 2:
                                                    posts = _context10.sent;
                                                    _context10.next = 5;
                                                    return _user2.default.find({
                                                        type: 'analyze'
                                                    });

                                                case 5:
                                                    _context10.t0 = _context10.sent;

                                                    if (_context10.t0) {
                                                        _context10.next = 8;
                                                        break;
                                                    }

                                                    _context10.t0 = [];

                                                case 8:
                                                    users = _context10.t0;
                                                    newUsers = [];
                                                    i = 0;

                                                case 11:
                                                    if (!(i < posts.length)) {
                                                        _context10.next = 64;
                                                        break;
                                                    }

                                                    _context10.next = 14;
                                                    return _this.driver.get(posts[i].url);

                                                case 14:
                                                    _context10.next = 16;
                                                    return _this.driver.findElements(By.className("error-container"));

                                                case 16:
                                                    _context10.t1 = _context10.sent;

                                                    if (!(_context10.t1 != 0)) {
                                                        _context10.next = 19;
                                                        break;
                                                    }

                                                    return _context10.abrupt('continue', 61);

                                                case 19:
                                                    console.log(i + 1 + ' of ' + posts.length + ' posts.');
                                                    _context10.next = 22;
                                                    return _this.driver.wait(until.elementLocated(By.className("_2g7d5")));

                                                case 22:
                                                    _context10.next = 24;
                                                    return _this.driver.findElements(By.className("_ezgzd"));

                                                case 24:
                                                    comments = _context10.sent;
                                                    _context10.next = 27;
                                                    return _this.driver.findElements(By.className("_nzn1h"));

                                                case 27:
                                                    _context10.t2 = _context10.sent;

                                                    if (!(_context10.t2 != 0)) {
                                                        _context10.next = 34;
                                                        break;
                                                    }

                                                    _context10.next = 31;
                                                    return _this.driver.findElement(By.css("._nzn1h span")).getText().then(function (likes) {
                                                        return likes.replace(',', '');
                                                    });

                                                case 31:
                                                    _context10.t3 = _context10.sent;
                                                    _context10.next = 35;
                                                    break;

                                                case 34:
                                                    _context10.t3 = 0;

                                                case 35:
                                                    likes = _context10.t3;
                                                    _context10.next = 38;
                                                    return _this.driver.findElements(By.className("_p29ma"));

                                                case 38:
                                                    _context10.t4 = _context10.sent;

                                                    if (!(_context10.t4 != 0)) {
                                                        _context10.next = 45;
                                                        break;
                                                    }

                                                    _context10.next = 42;
                                                    return _this.driver.findElement(By.className("_p29ma")).getAttribute('datetime');

                                                case 42:
                                                    _context10.t5 = _context10.sent;
                                                    _context10.next = 46;
                                                    break;

                                                case 45:
                                                    _context10.t5 = 0;

                                                case 46:
                                                    dateattr = _context10.t5;
                                                    datetime = Math.round((Date.now() - new Date(dateattr).getTime()) / (1000 * 60 * 60));
                                                    rating = Math.round(likes / datetime * 100) / 100;
                                                    _context10.next = 51;
                                                    return _post2.default.update({
                                                        url: posts[i].url
                                                    }, {
                                                        $set: {
                                                            type: 'reviewed',
                                                            reviewed: true,
                                                            likes: likes,
                                                            rating: rating,
                                                            reviewed_at: Date.now()
                                                        }
                                                    });

                                                case 51:
                                                    _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(j) {
                                                        var username;
                                                        return regeneratorRuntime.wrap(function _loop$(_context9) {
                                                            while (1) {
                                                                switch (_context9.prev = _context9.next) {
                                                                    case 0:
                                                                        _context9.next = 2;
                                                                        return comments[j].findElement(By.tagName('a')).getText();

                                                                    case 2:
                                                                        username = _context9.sent;

                                                                        //get the users which are not author of post and which are not duplicate
                                                                        if (username !== posts[i].username && (users.length > 0 ? !users.some(function (user) {
                                                                            return user.username === username;
                                                                        }) : true) && (newUsers.length > 0 ? !newUsers.some(function (user) {
                                                                            return user.username === username;
                                                                        }) : true)) {
                                                                            newUsers.push(new _user2.default({
                                                                                username: username,
                                                                                type: 'analyze'
                                                                            }));
                                                                            console.log('New username is:' + username);
                                                                        }

                                                                    case 4:
                                                                    case 'end':
                                                                        return _context9.stop();
                                                                }
                                                            }
                                                        }, _loop, _this);
                                                    });
                                                    j = 0;

                                                case 53:
                                                    if (!(j < comments.length)) {
                                                        _context10.next = 58;
                                                        break;
                                                    }

                                                    return _context10.delegateYield(_loop(j), 't6', 55);

                                                case 55:
                                                    j++;
                                                    _context10.next = 53;
                                                    break;

                                                case 58:
                                                    if (!(newUsers.length > config.userRefreshRate)) {
                                                        _context10.next = 61;
                                                        break;
                                                    }

                                                    _context10.next = 61;
                                                    return _user2.default.insertMany(newUsers, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                                                        return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                                            while (1) {
                                                                switch (_context8.prev = _context8.next) {
                                                                    case 0:
                                                                        console.log(newUsers.length + ' users were added to collection');
                                                                        console.log(users.length + ' users found.');
                                                                        newUsers.length = 0;
                                                                        _context8.next = 5;
                                                                        return _user2.default.find({});

                                                                    case 5:
                                                                        _context8.t0 = _context8.sent;

                                                                        if (_context8.t0) {
                                                                            _context8.next = 8;
                                                                            break;
                                                                        }

                                                                        _context8.t0 = [];

                                                                    case 8:
                                                                        users = _context8.t0;

                                                                    case 9:
                                                                    case 'end':
                                                                        return _context8.stop();
                                                                }
                                                            }
                                                        }, _callee8, this);
                                                    })));

                                                case 61:
                                                    i++;
                                                    _context10.next = 11;
                                                    break;

                                                case 64:
                                                case 'end':
                                                    return _context10.stop();
                                            }
                                        }
                                    }, _callee9, _this);
                                })(), 't0', 2);

                            case 2:
                                _context11.next = 6;
                                break;

                            case 4:
                                _context11.prev = 4;
                                _context11.t1 = _context11['catch'](0);

                            case 6:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee10, this, [[0, 4]]);
            }));

            function getNewUsers() {
                return _ref8.apply(this, arguments);
            }

            return getNewUsers;
        }()
    }, {
        key: 'analyzeUsers',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var users, i;
                return regeneratorRuntime.wrap(function _callee11$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return this.dbase.getUsersToAnalyze();

                            case 2:
                                users = _context12.sent;
                                i = 0;

                            case 4:
                                if (!(i < users.length)) {
                                    _context12.next = 27;
                                    break;
                                }

                                _context12.next = 7;
                                return this.driver.get(config.urls.main + users[i].username);

                            case 7:
                                _context12.next = 9;
                                return this.driver.findElements(By.className("error-container"));

                            case 9:
                                _context12.t0 = _context12.sent;

                                if (!(_context12.t0 != 0)) {
                                    _context12.next = 12;
                                    break;
                                }

                                this.removeUser(users[i].username);

                            case 12:
                                _context12.next = 14;
                                return this.driver.wait(until.elementLocated(By.className("_rf3jb")));

                            case 14:
                                _context12.next = 16;
                                return this.driver.findElements(By.className("_kcrwx"));

                            case 16:
                                _context12.t1 = _context12.sent;

                                if (!(_context12.t1 != 0)) {
                                    _context12.next = 22;
                                    break;
                                }

                                _context12.next = 20;
                                return _user2.default.update({
                                    username: users[i].username
                                }, {
                                    $set: {
                                        type: 'follow'
                                    }
                                });

                            case 20:
                                _context12.next = 24;
                                break;

                            case 22:
                                _context12.next = 24;
                                return _user2.default.update({
                                    username: users[i].username
                                }, {
                                    $set: {
                                        type: 'like'
                                    }
                                });

                            case 24:
                                i++;
                                _context12.next = 4;
                                break;

                            case 27:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function analyzeUsers() {
                return _ref10.apply(this, arguments);
            }

            return analyzeUsers;
        }()
    }, {
        key: 'removeUser',
        value: function removeUser(username) {
            return _user2.default.remove({
                username: username
            }, function (err) {
                if (err) console.log(err);
            });
        }
    }, {
        key: 'sendUserRequests',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var users, i;
                return regeneratorRuntime.wrap(function _callee12$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return this.dbase.getUsersToFollow();

                            case 2:
                                users = _context13.sent;
                                i = 0;

                            case 4:
                                if (!(i < users.length)) {
                                    _context13.next = 24;
                                    break;
                                }

                                _context13.next = 7;
                                return this.driver.get(config.urls.main + users[i].username);

                            case 7:
                                _context13.next = 9;
                                return this.driver.wait(until.elementLocated(By.className("_rf3jb")));

                            case 9:
                                _context13.next = 11;
                                return this.driver.findElements(By.className("_kcrwx"));

                            case 11:
                                _context13.t0 = _context13.sent;

                                if (!(_context13.t0 != 0)) {
                                    _context13.next = 21;
                                    break;
                                }

                                _context13.next = 15;
                                return this.driver.findElement(By.className('_r9b8f')).click();

                            case 15:
                                _context13.next = 17;
                                return this.driver.wait(until.elementLocated(By.className("_t78yp")));

                            case 17:
                                _context13.next = 19;
                                return _user2.default.update({
                                    username: users[i].username
                                }, {
                                    $set: {
                                        type: 'followed',
                                        reviewed: true,
                                        reviewed_at: Date.now()
                                    }
                                });

                            case 19:
                                _context13.next = 21;
                                break;

                            case 21:
                                i++;
                                _context13.next = 4;
                                break;

                            case 24:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function sendUserRequests() {
                return _ref11.apply(this, arguments);
            }

            return sendUserRequests;
        }()
    }, {
        key: 'likeUserPosts',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                var users, i, posts, postsArr, k, href, j;
                return regeneratorRuntime.wrap(function _callee13$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return this.dbase.getUsersToLike();

                            case 2:
                                users = _context14.sent;
                                i = 0;

                            case 4:
                                if (!(i < users.length)) {
                                    _context14.next = 52;
                                    break;
                                }

                                _context14.next = 7;
                                return this.driver.get(config.urls.main + users[i].username);

                            case 7:
                                _context14.next = 9;
                                return this.driver.wait(until.elementLocated(By.className("_rf3jb")));

                            case 9:
                                _context14.next = 11;
                                return this.driver.findElements(By.className("_mck9w"));

                            case 11:
                                _context14.t0 = _context14.sent;

                                if (!(_context14.t0 == 0)) {
                                    _context14.next = 15;
                                    break;
                                }

                                this.removeUser(users[i].username);
                                return _context14.abrupt('continue', 49);

                            case 15:
                                ;
                                this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
                                _context14.next = 19;
                                return this.driver.findElements(By.css('._mck9w a'));

                            case 19:
                                posts = _context14.sent;
                                postsArr = [];
                                k = 0;

                            case 22:
                                if (!(k < posts.length)) {
                                    _context14.next = 30;
                                    break;
                                }

                                _context14.next = 25;
                                return posts[k].getAttribute('href');

                            case 25:
                                href = _context14.sent;

                                postsArr.push(href);

                            case 27:
                                k++;
                                _context14.next = 22;
                                break;

                            case 30:
                                j = 0;

                            case 31:
                                if (!(j < config.userPostsToLike && j < postsArr.length)) {
                                    _context14.next = 47;
                                    break;
                                }

                                _context14.next = 34;
                                return this.driver.get(postsArr[j]);

                            case 34:
                                _context14.next = 36;
                                return this.driver.findElements(By.className("coreSpriteHeartFull"));

                            case 36:
                                _context14.t1 = _context14.sent.length;
                                _context14.t2 = [];

                                if (!(_context14.t1 != _context14.t2)) {
                                    _context14.next = 40;
                                    break;
                                }

                                return _context14.abrupt('continue', 44);

                            case 40:
                                this.driver.wait(until.elementLocated(By.className('coreSpriteHeartOpen')), config.timeout);
                                _context14.next = 43;
                                return this.driver.findElement(By.className('coreSpriteHeartOpen')).click();

                            case 43:
                                console.log('here');

                            case 44:
                                j++;
                                _context14.next = 31;
                                break;

                            case 47:
                                _context14.next = 49;
                                return _user2.default.update({
                                    username: users[i].username
                                }, {
                                    $set: {
                                        type: 'like',
                                        reviewed: true,
                                        reviewed_at: Date.now()
                                    }
                                });

                            case 49:
                                i++;
                                _context14.next = 4;
                                break;

                            case 52:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function likeUserPosts() {
                return _ref12.apply(this, arguments);
            }

            return likeUserPosts;
        }()
    }]);

    return InstagramAPI;
}();

exports.default = InstagramAPI;