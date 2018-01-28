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
            return new Promise(function (resolve) {
                this.driver.wait(until.elementLocated(By.className('coreSpriteDesktopNavProfile')), config.timeout);
                this.driver.findElement(By.className('coreSpriteDesktopNavProfile')).click().then(function () {
                    return resolve();
                });
            }.bind(this));
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
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
                    var posts, postsArr, i, href;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.next = 2;
                                    return this.driver.findElements(By.className("_kcrwx"));

                                case 2:
                                    _context6.t0 = _context6.sent;

                                    if (!(_context6.t0 != 0)) {
                                        _context6.next = 5;
                                        break;
                                    }

                                    return _context6.abrupt('return', resolve());

                                case 5:
                                    this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
                                    _context6.next = 8;
                                    return this.driver.findElements(By.css('._mck9w a'));

                                case 8:
                                    posts = _context6.sent;
                                    postsArr = [];
                                    i = 0;

                                case 11:
                                    if (!(i < posts.length)) {
                                        _context6.next = 24;
                                        break;
                                    }

                                    _context6.next = 14;
                                    return posts[i].getAttribute('href');

                                case 14:
                                    href = _context6.sent;

                                    postsArr.push(new _post2.default({
                                        'url': href,
                                        'username': username,
                                        'type': 'analyze'
                                    }));

                                    if (!(postsArr.length === posts.length)) {
                                        _context6.next = 21;
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
                                    _context6.next = 20;
                                    return _post2.default.insertMany(postsArr, function () {
                                        return console.log(posts.length + ' items were added to collection');
                                    });

                                case 20:
                                    resolve();

                                case 21:
                                    i++;
                                    _context6.next = 11;
                                    break;

                                case 24:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this);
                }));

                return function (_x8, _x9) {
                    return _ref6.apply(this, arguments);
                };
            }().bind(this));
        }
    }, {
        key: 'getNewUsers',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee9$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.prev = 0;
                                return _context10.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                                    var posts, postsToDelete, users, newUsers, i, comments, likes, dateattr, datetime, rating, _loop, j;

                                    return regeneratorRuntime.wrap(function _callee8$(_context9) {
                                        while (1) {
                                            switch (_context9.prev = _context9.next) {
                                                case 0:
                                                    _context9.next = 2;
                                                    return _post2.default.find({
                                                        type: 'analyze'
                                                    });

                                                case 2:
                                                    posts = _context9.sent;
                                                    postsToDelete = [];
                                                    _context9.next = 6;
                                                    return _user2.default.find({
                                                        type: 'analyze'
                                                    });

                                                case 6:
                                                    _context9.t0 = _context9.sent;

                                                    if (_context9.t0) {
                                                        _context9.next = 9;
                                                        break;
                                                    }

                                                    _context9.t0 = [];

                                                case 9:
                                                    users = _context9.t0;
                                                    newUsers = [];
                                                    i = 0;

                                                case 12:
                                                    if (!(i < posts.length)) {
                                                        _context9.next = 71;
                                                        break;
                                                    }

                                                    _context9.next = 15;
                                                    return _this.driver.get(posts[i].url);

                                                case 15:
                                                    _context9.next = 17;
                                                    return _this.driver.findElements(By.className("error-container"));

                                                case 17:
                                                    _context9.t1 = _context9.sent;

                                                    if (!(_context9.t1 != 0)) {
                                                        _context9.next = 20;
                                                        break;
                                                    }

                                                    return _context9.abrupt('continue', 68);

                                                case 20:
                                                    _context9.t2 = console;
                                                    _context9.next = 23;
                                                    return _this.driver.findElements(By.className("error-container"));

                                                case 23:
                                                    _context9.t3 = _context9.sent;
                                                    _context9.t4 = _context9.t3 != 0;

                                                    _context9.t2.log.call(_context9.t2, _context9.t4);

                                                    console.log(i + 1 + ' of ' + posts.length + ' posts.');
                                                    _context9.next = 29;
                                                    return _this.driver.wait(until.elementLocated(By.className("_2g7d5")));

                                                case 29:
                                                    _context9.next = 31;
                                                    return _this.driver.findElements(By.className("_ezgzd"));

                                                case 31:
                                                    comments = _context9.sent;
                                                    _context9.next = 34;
                                                    return _this.driver.findElements(By.className("_nzn1h"));

                                                case 34:
                                                    _context9.t5 = _context9.sent;

                                                    if (!(_context9.t5 != 0)) {
                                                        _context9.next = 41;
                                                        break;
                                                    }

                                                    _context9.next = 38;
                                                    return _this.driver.findElement(By.css("._nzn1h span")).getText();

                                                case 38:
                                                    _context9.t6 = _context9.sent;
                                                    _context9.next = 42;
                                                    break;

                                                case 41:
                                                    _context9.t6 = 0;

                                                case 42:
                                                    likes = _context9.t6;
                                                    _context9.next = 45;
                                                    return _this.driver.findElements(By.className("_p29ma"));

                                                case 45:
                                                    _context9.t7 = _context9.sent;

                                                    if (!(_context9.t7 != 0)) {
                                                        _context9.next = 52;
                                                        break;
                                                    }

                                                    _context9.next = 49;
                                                    return _this.driver.findElement(By.className("_p29ma")).getAttribute('datetime');

                                                case 49:
                                                    _context9.t8 = _context9.sent;
                                                    _context9.next = 53;
                                                    break;

                                                case 52:
                                                    _context9.t8 = 0;

                                                case 53:
                                                    dateattr = _context9.t8;
                                                    datetime = Math.round((Date.now() - new Date(dateattr).getTime()) / (1000 * 60 * 60));
                                                    rating = Math.round(likes / datetime * 100) / 100;
                                                    _context9.next = 58;
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

                                                case 58:
                                                    _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(j) {
                                                        var username;
                                                        return regeneratorRuntime.wrap(function _loop$(_context8) {
                                                            while (1) {
                                                                switch (_context8.prev = _context8.next) {
                                                                    case 0:
                                                                        _context8.next = 2;
                                                                        return comments[j].findElement(By.tagName('a')).getText();

                                                                    case 2:
                                                                        username = _context8.sent;

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
                                                                        return _context8.stop();
                                                                }
                                                            }
                                                        }, _loop, _this);
                                                    });
                                                    j = 0;

                                                case 60:
                                                    if (!(j < comments.length)) {
                                                        _context9.next = 65;
                                                        break;
                                                    }

                                                    return _context9.delegateYield(_loop(j), 't9', 62);

                                                case 62:
                                                    j++;
                                                    _context9.next = 60;
                                                    break;

                                                case 65:
                                                    if (!(newUsers.length > config.userRefreshRate)) {
                                                        _context9.next = 68;
                                                        break;
                                                    }

                                                    _context9.next = 68;
                                                    return _user2.default.insertMany(newUsers, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                                                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                            while (1) {
                                                                switch (_context7.prev = _context7.next) {
                                                                    case 0:
                                                                        console.log(newUsers.length + ' users were added to collection');
                                                                        console.log(users.length + ' users found.');
                                                                        newUsers.length = 0;
                                                                        _context7.next = 5;
                                                                        return _user2.default.find({});

                                                                    case 5:
                                                                        _context7.t0 = _context7.sent;

                                                                        if (_context7.t0) {
                                                                            _context7.next = 8;
                                                                            break;
                                                                        }

                                                                        _context7.t0 = [];

                                                                    case 8:
                                                                        users = _context7.t0;

                                                                    case 9:
                                                                    case 'end':
                                                                        return _context7.stop();
                                                                }
                                                            }
                                                        }, _callee7, this);
                                                    })));

                                                case 68:
                                                    i++;
                                                    _context9.next = 12;
                                                    break;

                                                case 71:
                                                case 'end':
                                                    return _context9.stop();
                                            }
                                        }
                                    }, _callee8, _this);
                                })(), 't0', 2);

                            case 2:
                                _context10.next = 6;
                                break;

                            case 4:
                                _context10.prev = 4;
                                _context10.t1 = _context10['catch'](0);

                            case 6:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee9, this, [[0, 4]]);
            }));

            function getNewUsers() {
                return _ref7.apply(this, arguments);
            }

            return getNewUsers;
        }()
    }]);

    return InstagramAPI;
}();

exports.default = InstagramAPI;