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
                                type: 'analyze',
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
    reviewed: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _post2.default.find({
                                reviewed: true
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

        function reviewed() {
            return _ref3.apply(this, arguments);
        }

        return reviewed;
    }(),
    remove: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(post) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _post2.default.remove({
                                url: post.url
                            }, function (err) {
                                if (err) console.log(err);
                                console.log('Post was removed');
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

        function remove(_x3) {
            return _ref4.apply(this, arguments);
        }

        return remove;
    }(),
    insertMany: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(postsArr) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            return _context6.abrupt('return', new Promise(function () {
                                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    _context5.next = 2;
                                                    return _post2.default.insertMany(postsArr, function (err) {
                                                        if (err) reject();
                                                        console.log(postsArr.length + ' posts were added');
                                                        resolve();
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

                                return function (_x5, _x6) {
                                    return _ref6.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function insertMany(_x4) {
            return _ref5.apply(this, arguments);
        }

        return insertMany;
    }()
};