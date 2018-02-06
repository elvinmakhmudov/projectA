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
    until = _require.until,
    Key = _require.Key;

var InstagramAPI = function () {
    function InstagramAPI(login, password, comments) {
        _classCallCheck(this, InstagramAPI);

        this.login = login || config.instagram.login;
        this.password = password || config.instagram.password;
        this.comments = comments || config.comments;
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
                                        var _i;

                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (!(cookies.length !== 0)) {
                                                            _context2.next = 9;
                                                            break;
                                                        }

                                                        _i = 0;

                                                    case 2:
                                                        if (!(_i < cookies.length)) {
                                                            _context2.next = 8;
                                                            break;
                                                        }

                                                        _context2.next = 5;
                                                        return this.driver.manage().addCookie(JSON.parse(cookies[_i].cookies));

                                                    case 5:
                                                        _i++;
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
                                        var cookies, cookiesArr, _i2;

                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.next = 2;
                                                        return this.driver.manage().getCookies();

                                                    case 2:
                                                        cookies = _context4.sent;
                                                        cookiesArr = [];

                                                        for (_i2 = 0; _i2 < cookies.length; _i2++) {
                                                            cookiesArr.push(new _cookie2.default({
                                                                username: username,
                                                                cookies: JSON.stringify(cookies[_i2])
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
                            for (var _i3 = 0; _i3 < followings.length; _i3++) {
                                followings[_i3].getText().then(function (following) {
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
        value: function savePostsToAnalyze(page) {
            return new Promise(function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
                    var posts, postsArr, _i4, href;

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
                                    _context7.next = 7;
                                    return this.driver.findElements(By.className("_mck9w"));

                                case 7:
                                    _context7.t1 = _context7.sent;

                                    if (!(_context7.t1 == 0)) {
                                        _context7.next = 11;
                                        break;
                                    }

                                    throw "Error";

                                case 11:
                                    ;
                                    this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
                                    _context7.next = 15;
                                    return this.driver.findElements(By.css('._mck9w a'));

                                case 15:
                                    posts = _context7.sent;
                                    postsArr = [];
                                    _i4 = 0;

                                case 18:
                                    if (!(_i4 < posts.length)) {
                                        _context7.next = 27;
                                        break;
                                    }

                                    _context7.next = 21;
                                    return posts[_i4].getAttribute('href');

                                case 21:
                                    href = _context7.sent;

                                    postsArr.push(new _post2.default({
                                        'url': href,
                                        'username': page.username,
                                        'type': 'analyze',
                                        'page': page._id
                                    }).save());
                                    if (postsArr.length === posts.length) {
                                        _page2.default.update({
                                            username: page.username
                                        }, {
                                            $set: {
                                                reviewed: true,
                                                reviewed_at: Date.now()
                                            }
                                        });
                                        // await Post.insertMany(postsArr, () => console.log(posts.length + ' posts were added'));
                                        resolve();
                                    }

                                case 24:
                                    _i4++;
                                    _context7.next = 18;
                                    break;

                                case 27:
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
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(post, users) {
                var _this = this;

                var newUsers, comments, likes, dateattr, datetime, rating, _loop, j;

                return regeneratorRuntime.wrap(function _callee8$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.prev = 0;

                                // let posts = await this.dbase.getPostsToAnalyze();
                                // let users = await this.dbase.getUsersToAnalyze() || [];
                                newUsers = [];
                                // for (let i = 0; i < posts.length; i++) {

                                _context9.next = 4;
                                return this.driver.get(post.url);

                            case 4:
                                _context9.next = 6;
                                return this.driver.findElements(By.className("error-container"));

                            case 6:
                                _context9.t0 = _context9.sent;

                                if (!(_context9.t0 != 0)) {
                                    _context9.next = 10;
                                    break;
                                }

                                throw "Error";

                            case 10:
                                ;
                                _context9.next = 13;
                                return this.driver.wait(until.elementLocated(By.className("_2g7d5")));

                            case 13:
                                _context9.next = 15;
                                return this.driver.findElements(By.className("_ezgzd"));

                            case 15:
                                comments = _context9.sent;
                                _context9.next = 18;
                                return this.driver.findElements(By.className("_nzn1h"));

                            case 18:
                                _context9.t1 = _context9.sent;

                                if (!(_context9.t1 != 0)) {
                                    _context9.next = 25;
                                    break;
                                }

                                _context9.next = 22;
                                return this.driver.findElement(By.css("._nzn1h span")).getText().then(function (likes) {
                                    return likes.replace(',', '');
                                });

                            case 22:
                                _context9.t2 = _context9.sent;
                                _context9.next = 26;
                                break;

                            case 25:
                                _context9.t2 = 0;

                            case 26:
                                likes = _context9.t2;
                                _context9.next = 29;
                                return this.driver.findElements(By.className("_p29ma"));

                            case 29:
                                _context9.t3 = _context9.sent;

                                if (!(_context9.t3 != 0)) {
                                    _context9.next = 36;
                                    break;
                                }

                                _context9.next = 33;
                                return this.driver.findElement(By.className("_p29ma")).getAttribute('datetime');

                            case 33:
                                _context9.t4 = _context9.sent;
                                _context9.next = 37;
                                break;

                            case 36:
                                _context9.t4 = 0;

                            case 37:
                                dateattr = _context9.t4;
                                datetime = Math.round((Date.now() - new Date(dateattr).getTime()) / (1000 * 60 * 60));
                                rating = Math.round(likes / datetime * 100) / 100;
                                _context9.next = 42;
                                return _post2.default.update({
                                    url: post.url
                                }, {
                                    $set: {
                                        type: 'reviewed',
                                        reviewed: true,
                                        likes: likes,
                                        rating: rating,
                                        reviewed_at: Date.now()
                                    }
                                });

                            case 42:
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

                                                    if (!(username !== post.username && (users.length > 0 ? !users.some(function (user) {
                                                        return user.username === username;
                                                    }) : true) && (newUsers.length > 0 ? !newUsers.some(function (user) {
                                                        return user.username === username;
                                                    }) : true))) {
                                                        _context8.next = 10;
                                                        break;
                                                    }

                                                    _context8.t0 = newUsers;
                                                    _context8.next = 7;
                                                    return new _user2.default({
                                                        username: username,
                                                        type: 'analyze'
                                                    });

                                                case 7:
                                                    _context8.t1 = _context8.sent;

                                                    _context8.t0.push.call(_context8.t0, _context8.t1);

                                                    console.log('New username is:' + username);

                                                case 10:
                                                case 'end':
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _loop, _this);
                                });
                                j = 0;

                            case 44:
                                if (!(j < comments.length)) {
                                    _context9.next = 49;
                                    break;
                                }

                                return _context9.delegateYield(_loop(j), 't5', 46);

                            case 46:
                                j++;
                                _context9.next = 44;
                                break;

                            case 49:
                                console.log('InstagramAPI newUsers: ' + newUsers.length);
                                return _context9.abrupt('return', newUsers);

                            case 53:
                                _context9.prev = 53;
                                _context9.t6 = _context9['catch'](0);

                                console.log(_context9.t6);

                            case 56:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee8, this, [[0, 53]]);
            }));

            function getNewUsers(_x11, _x12) {
                return _ref8.apply(this, arguments);
            }

            return getNewUsers;
        }()

        /**
         * Analyzes user and returns user type 
         * 
         * @param {*} user 
         */

    }, {
        key: 'getUserType',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(user) {
                return regeneratorRuntime.wrap(function _callee9$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return this.driver.get(config.urls.main + user.username);

                            case 2:
                                _context10.next = 4;
                                return this.driver.findElements(By.className("error-container"));

                            case 4:
                                _context10.t0 = _context10.sent;

                                if (!(_context10.t0 != 0)) {
                                    _context10.next = 8;
                                    break;
                                }

                                throw 'Error';

                            case 8:
                                ;
                                console.log('Analyzing ' + user.username);
                                _context10.next = 12;
                                return this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);

                            case 12:
                                _context10.next = 14;
                                return this.driver.findElements(By.className("_kcrwx"));

                            case 14:
                                _context10.t1 = _context10.sent;

                                if (!(_context10.t1 != 0)) {
                                    _context10.next = 19;
                                    break;
                                }

                                return _context10.abrupt('return', 'follow');

                            case 19:
                                return _context10.abrupt('return', 'like');

                            case 20:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function getUserType(_x13) {
                return _ref9.apply(this, arguments);
            }

            return getUserType;
        }()
    }, {
        key: 'removePost',
        value: function removePost(url) {
            return _post2.default.remove({
                url: url
            }, function (err) {
                if (err) console.log(err);
                console.log('Post was removed');
            });
        }
    }, {
        key: 'removeUser',
        value: function removeUser(username) {
            return _user2.default.remove({
                username: username
            }, function (err) {
                if (err) console.log(err);
                console.log(username + ' was removed');
            });
        }
    }, {
        key: 'followUser',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(user) {
                return regeneratorRuntime.wrap(function _callee10$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return this.driver.get(config.urls.main + user.username);

                            case 2:
                                _context11.next = 4;
                                return this.driver.findElements(By.className("error-container"));

                            case 4:
                                _context11.t0 = _context11.sent;

                                if (!(_context11.t0 != 0)) {
                                    _context11.next = 7;
                                    break;
                                }

                                return _context11.abrupt('return', false);

                            case 7:
                                ;
                                console.log('Following ' + user.username);
                                _context11.next = 11;
                                return this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);

                            case 11:
                                _context11.next = 13;
                                return this.driver.findElements(By.className("_kcrwx"));

                            case 13:
                                _context11.t1 = _context11.sent;

                                if (!(_context11.t1 != 0)) {
                                    _context11.next = 22;
                                    break;
                                }

                                _context11.next = 17;
                                return this.driver.findElement(By.className('_r9b8f')).click();

                            case 17:
                                _context11.next = 19;
                                return this.driver.wait(until.elementLocated(By.className("_t78yp")), config.timeout);

                            case 19:
                                return _context11.abrupt('return', true);

                            case 22:
                                return _context11.abrupt('return', false);

                            case 23:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function followUser(_x14) {
                return _ref10.apply(this, arguments);
            }

            return followUser;
        }()
    }, {
        key: 'unfollowUser',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(user) {
                return regeneratorRuntime.wrap(function _callee11$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return this.driver.get(config.urls.main + user.username);

                            case 2:
                                _context12.next = 4;
                                return this.driver.findElements(By.className("error-container"));

                            case 4:
                                _context12.t0 = _context12.sent;

                                if (!(_context12.t0 != 0)) {
                                    _context12.next = 7;
                                    break;
                                }

                                return _context12.abrupt('return', false);

                            case 7:
                                ;
                                _context12.next = 10;
                                return this.driver.findElements(By.className("_t78yp"));

                            case 10:
                                _context12.t1 = _context12.sent;

                                if (!(_context12.t1 != 0)) {
                                    _context12.next = 16;
                                    break;
                                }

                                _context12.next = 14;
                                return this.driver.findElement(By.className('_t78yp')).click();

                            case 14:
                                _context12.next = 16;
                                return this.sleep(1);

                            case 16:
                                console.log('Unfollowing ' + users[i].username);
                                _context12.next = 19;
                                return _user2.default.update({
                                    username: users[i].username
                                }, {
                                    $set: {
                                        type: 'unfollowed',
                                        reviewed: true,
                                        reviewed_at: Date.now()
                                    }
                                });

                            case 19:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function unfollowUser(_x15) {
                return _ref11.apply(this, arguments);
            }

            return unfollowUser;
        }()
    }, {
        key: 'likeUserPosts',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var users, _i5, posts, postsArr, k, href, j;

                return regeneratorRuntime.wrap(function _callee12$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return this.dbase.getUsersToLike();

                            case 2:
                                users = _context13.sent;
                                _i5 = 0;

                            case 4:
                                if (!(_i5 < users.length)) {
                                    _context13.next = 54;
                                    break;
                                }

                                _context13.next = 7;
                                return this.driver.get(config.urls.main + users[_i5].username);

                            case 7:
                                _context13.next = 9;
                                return this.driver.findElements(By.className("_mck9w"));

                            case 9:
                                _context13.t0 = _context13.sent;

                                if (!(_context13.t0 == 0)) {
                                    _context13.next = 13;
                                    break;
                                }

                                this.removeUser(users[_i5].username);
                                return _context13.abrupt('continue', 51);

                            case 13:
                                ;
                                _context13.next = 16;
                                return this.driver.wait(until.elementLocated(By.className("_rf3jb")), config.timeout);

                            case 16:
                                this.driver.wait(until.elementLocated(By.css('._mck9w a')), config.timeout);
                                _context13.next = 19;
                                return this.driver.findElements(By.css('._mck9w a'));

                            case 19:
                                posts = _context13.sent;
                                postsArr = [];
                                k = 0;

                            case 22:
                                if (!(k < posts.length)) {
                                    _context13.next = 30;
                                    break;
                                }

                                _context13.next = 25;
                                return posts[k].getAttribute('href');

                            case 25:
                                href = _context13.sent;

                                postsArr.push(href);

                            case 27:
                                k++;
                                _context13.next = 22;
                                break;

                            case 30:
                                j = 0;

                            case 31:
                                if (!(j < config.userPostsToLike && j < postsArr.length)) {
                                    _context13.next = 48;
                                    break;
                                }

                                _context13.next = 34;
                                return this.driver.get(postsArr[j]);

                            case 34:
                                _context13.next = 36;
                                return this.driver.findElements(By.className("coreSpriteHeartFull"));

                            case 36:
                                _context13.t1 = _context13.sent.length;
                                _context13.t2 = [];

                                if (!(_context13.t1 != _context13.t2)) {
                                    _context13.next = 40;
                                    break;
                                }

                                return _context13.abrupt('continue', 45);

                            case 40:
                                this.driver.wait(until.elementLocated(By.className('coreSpriteHeartOpen')), config.timeout);
                                _context13.next = 43;
                                return this.driver.findElement(By.className('coreSpriteHeartOpen')).click();

                            case 43:
                                _context13.next = 45;
                                return this.sleep(1);

                            case 45:
                                j++;
                                _context13.next = 31;
                                break;

                            case 48:
                                _context13.next = 50;
                                return _user2.default.update({
                                    username: users[_i5].username
                                }, {
                                    $set: {
                                        type: 'like',
                                        reviewed: true,
                                        reviewed_at: Date.now()
                                    }
                                });

                            case 50:
                                console.log('liked posts of ' + users[_i5].username);

                            case 51:
                                _i5++;
                                _context13.next = 4;
                                break;

                            case 54:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function likeUserPosts() {
                return _ref12.apply(this, arguments);
            }

            return likeUserPosts;
        }()
    }, {
        key: 'commentPosts',
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                var posts, _i6, comment;

                return regeneratorRuntime.wrap(function _callee13$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return this.dbase.getPostsToComment();

                            case 2:
                                posts = _context14.sent;
                                _i6 = 0;

                            case 4:
                                if (!(_i6 < posts.length)) {
                                    _context14.next = 31;
                                    break;
                                }

                                _context14.next = 7;
                                return this.driver.get(posts[_i6].url);

                            case 7:
                                _context14.next = 9;
                                return this.driver.findElements(By.className("error-container"));

                            case 9:
                                _context14.t0 = _context14.sent;

                                if (!(_context14.t0 != 0)) {
                                    _context14.next = 13;
                                    break;
                                }

                                this.removePost(posts[_i6].url);
                                return _context14.abrupt('continue', 28);

                            case 13:
                                ;
                                console.log(_i6 + 1 + ' of ' + posts.length + ' posts.');
                                _context14.next = 17;
                                return this.driver.wait(until.elementLocated(By.className("_bilrf")), config.timeout);

                            case 17:
                                //comment post
                                comment = this.comments[Math.floor(Math.random() * this.comments.length)];
                                _context14.next = 20;
                                return this.driver.findElement(By.className('_bilrf')).clear();

                            case 20:
                                _context14.next = 22;
                                return this.driver.findElement(By.className('_bilrf')).sendKeys(comment);

                            case 22:
                                _context14.next = 24;
                                return _post2.default.update({
                                    url: posts[_i6].url
                                }, {
                                    $set: {
                                        type: 'commented',
                                        reviewed: true,
                                        reviewed_at: Date.now()
                                    }
                                });

                            case 24:
                                _context14.next = 26;
                                return _page2.default.update({
                                    username: posts[_i6].username
                                }, {
                                    $set: {
                                        type: 'commented',
                                        reviewed: true,
                                        reviewed_at: Date.now(),
                                        commented_at: Date.now(),
                                        commented_times: post.page.commented_times >= config.maxCommentForPageInDay ? 1 : post.page.commented_times + 1
                                    }
                                });

                            case 26:
                                _context14.next = 28;
                                return this.sleep(1);

                            case 28:
                                _i6++;
                                _context14.next = 4;
                                break;

                            case 31:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function commentPosts() {
                return _ref13.apply(this, arguments);
            }

            return commentPosts;
        }()
    }, {
        key: 'sleep',
        value: function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(seconds) {
                return regeneratorRuntime.wrap(function _callee14$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                console.log('sleeping for ' + seconds + ' seconds.');
                                _context15.next = 3;
                                return this.driver.sleep(seconds * 1000);

                            case 3:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee14, this);
            }));

            function sleep(_x16) {
                return _ref14.apply(this, arguments);
            }

            return sleep;
        }()
    }]);

    return InstagramAPI;
}();

exports.default = InstagramAPI;