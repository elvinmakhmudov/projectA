'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = require('../../config.json');
exports.default = {
    comment: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(limit) {
            var d, yesterdayInMseconds, posts;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            d = new Date();

                            d.setDate(d.getDate() - 1);
                            yesterdayInMseconds = Date.now() - d.getMilliseconds();
                            _context.next = 5;
                            return _post2.default.find({
                                type: 'comment',
                                reviewed: false
                            }).populate({
                                path: 'page',
                                match: {
                                    $or: [{
                                        commented_times: {
                                            $lt: config.maxCommentForPageInDay
                                        }
                                    }, {
                                        commented_at: {
                                            $lt: yesterdayInMseconds
                                        }
                                    }]
                                }
                            }).sort({
                                rating: -1
                            }).limit(limit || config.batchUserLimitCount);

                        case 5:
                            posts = _context.sent;
                            _context.next = 8;
                            return posts.filter(function (post) {
                                return post.page.length != [] ? true : false;
                            });

                        case 8:
                            posts = _context.sent;
                            return _context.abrupt('return', posts);

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function comment(_x) {
            return _ref.apply(this, arguments);
        }

        return comment;
    }(),
    analyze: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(limit) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _post2.default.find({
                                type: 'analyze',
                                reviewed: false
                            }).sort({
                                rating: -1
                            }).limit(limit || config.batchUserLimitCount);

                        case 2:
                            return _context2.abrupt('return', _context2.sent);

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function analyze(_x2) {
            return _ref2.apply(this, arguments);
        }

        return analyze;
    }(),
    postsFor: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _post2.default.find({
                                reviewed: false,
                                username: page.username
                            }).sort({
                                rating: -1
                            });

                        case 2:
                            return _context3.abrupt('return', _context3.sent);

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function postsFor(_x3) {
            return _ref3.apply(this, arguments);
        }

        return postsFor;
    }(),
    reviewed: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(limit) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _post2.default.find({
                                reviewed: true
                            });

                        case 2:
                            return _context4.abrupt('return', _context4.sent);

                        case 3:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function reviewed(_x4) {
            return _ref4.apply(this, arguments);
        }

        return reviewed;
    }(),
    remove: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(post) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _post2.default.remove({
                                url: post.url
                            }, function (err) {
                                if (err) console.log(err);
                                console.log('Post was removed');
                            });

                        case 2:
                            return _context5.abrupt('return', _context5.sent);

                        case 3:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function remove(_x5) {
            return _ref5.apply(this, arguments);
        }

        return remove;
    }(),
    insertMany: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(postsArr) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', new Promise(function () {
                                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    _context6.next = 2;
                                                    return _post2.default.insertMany(postsArr, {
                                                        ordered: false
                                                    }, function (err) {
                                                        if (err) return reject(err);
                                                        return resolve();
                                                    });

                                                case 2:
                                                    return _context6.abrupt('return', _context6.sent);

                                                case 3:
                                                case 'end':
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee6, this);
                                }));

                                return function (_x7, _x8) {
                                    return _ref7.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function insertMany(_x6) {
            return _ref6.apply(this, arguments);
        }

        return insertMany;
    }(),
    setReviewed: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(post, postData) {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            return _context9.abrupt('return', new Promise(function () {
                                var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    _context8.next = 2;
                                                    return _post2.default.update({
                                                        url: post.url
                                                    }, {
                                                        $set: {
                                                            type: 'reviewed',
                                                            reviewed: true,
                                                            likes: postData.likes,
                                                            rating: postData.rating,
                                                            reviewed_at: Date.now()
                                                        }
                                                    }, function (err, post) {
                                                        if (err) return reject(err);
                                                        return resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _callee8, this);
                                }));

                                return function (_x11, _x12) {
                                    return _ref9.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function setReviewed(_x9, _x10) {
            return _ref8.apply(this, arguments);
        }

        return setReviewed;
    }(),
    setType: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(post, type) {
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            return _context11.abrupt('return', new Promise(function () {
                                var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                        while (1) {
                                            switch (_context10.prev = _context10.next) {
                                                case 0:
                                                    _context10.next = 2;
                                                    return _post2.default.update({
                                                        url: post.url
                                                    }, {
                                                        $set: {
                                                            type: type,
                                                            reviewed: true,
                                                            reviewed_at: Date.now()
                                                        }
                                                    }, function (err, post) {
                                                        if (err) return reject(err);
                                                        console.log('Post type was set to ' + type);
                                                        resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context10.stop();
                                            }
                                        }
                                    }, _callee10, this);
                                }));

                                return function (_x15, _x16) {
                                    return _ref11.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this);
        }));

        function setType(_x13, _x14) {
            return _ref10.apply(this, arguments);
        }

        return setType;
    }(),
    setRating: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(post, rating) {
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            return _context13.abrupt('return', new Promise(function () {
                                var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                                        while (1) {
                                            switch (_context12.prev = _context12.next) {
                                                case 0:
                                                    _context12.next = 2;
                                                    return _post2.default.update({
                                                        url: post.url
                                                    }, {
                                                        $set: {
                                                            rating: rating
                                                        }
                                                    }, function (err, post) {
                                                        if (err) return reject(err);
                                                        console.log('Post rating was set to ' + rating);
                                                        resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context12.stop();
                                            }
                                        }
                                    }, _callee12, this);
                                }));

                                return function (_x19, _x20) {
                                    return _ref13.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this);
        }));

        function setRating(_x17, _x18) {
            return _ref12.apply(this, arguments);
        }

        return setRating;
    }()
};