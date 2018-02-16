'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _page = require('../models/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = require('../../config.json');
exports.default = {
    remove: function remove(page) {
        return new Promise(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _page2.default.remove({
                                    username: page.username
                                }, function (err) {
                                    if (err) reject(err);
                                    console.log(page.username + ' was removed.');
                                    resolve();
                                });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());
    },
    private: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(limit) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', new Promise(function () {
                                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.next = 2;
                                                    return _page2.default.findRandom({ reviewed: false, type: 'private' }, {}, { limit: limit || config.batchUserLimitCount }, function (err, results) {
                                                        if (err) return reject(err);
                                                        return resolve(results);
                                                    });

                                                case 2:
                                                    return _context2.abrupt('return', _context2.sent);

                                                case 3:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, this);
                                }));

                                return function (_x4, _x5) {
                                    return _ref3.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function _private(_x3) {
            return _ref2.apply(this, arguments);
        }

        return _private;
    }(),
    explore: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(limit) {
            var d, yesterdayInMseconds;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            d = new Date();

                            d.setDate(d.getDate() - config.oldestPageInDays);
                            yesterdayInMseconds = Date.now() - d.getMilliseconds();
                            return _context4.abrupt('return', _page2.default.find({
                                reviewed: false,
                                type: 'explore',
                                reviewed_at: {
                                    $lt: yesterdayInMseconds
                                }
                            }, {}, { limit: limit || limit }));

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function explore(_x6) {
            return _ref4.apply(this, arguments);
        }

        return explore;
    }(),
    insertMany: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(pageArr) {
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
                                                    return _page2.default.collection.insertMany(pageArr, { ordered: false }, function (err) {
                                                        if (err) reject(err);
                                                        console.log(pageArr.length + ' pages were added');
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

                                return function (_x8, _x9) {
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

        function insertMany(_x7) {
            return _ref5.apply(this, arguments);
        }

        return insertMany;
    }(),
    setReviewed: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(page) {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            return _context8.abrupt('return', new Promise(function () {
                                var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                        while (1) {
                                            switch (_context7.prev = _context7.next) {
                                                case 0:
                                                    _context7.next = 2;
                                                    return _page2.default.update({
                                                        username: page.username
                                                    }, {
                                                        $set: {
                                                            reviewed: true,
                                                            reviewed_at: Date.now()
                                                        }
                                                    }, function (err, page) {
                                                        if (err) reject(err);
                                                        resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context7.stop();
                                            }
                                        }
                                    }, _callee7, this);
                                }));

                                return function (_x11, _x12) {
                                    return _ref8.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function setReviewed(_x10) {
            return _ref7.apply(this, arguments);
        }

        return setReviewed;
    }(),
    setCommented: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(page) {
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            return _context10.abrupt('return', new Promise(function () {
                                var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                        while (1) {
                                            switch (_context9.prev = _context9.next) {
                                                case 0:
                                                    _context9.next = 2;
                                                    return _page2.default.update({
                                                        username: page.username
                                                    }, {
                                                        $set: {
                                                            type: 'commented',
                                                            reviewed: true,
                                                            reviewed_at: Date.now(),
                                                            commented_at: Date.now(),
                                                            commented_times: Number(Number(page.commented_times) >= Number(config.maxCommentForPageInDay)) ? 1 : Number(page.commented_times) + 1
                                                        }
                                                    }, function (err) {
                                                        if (err) reject(err);
                                                        console.log('Page ' + page.username + ' was commented');
                                                        resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context9.stop();
                                            }
                                        }
                                    }, _callee9, this);
                                }));

                                return function (_x14, _x15) {
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

        function setCommented(_x13) {
            return _ref9.apply(this, arguments);
        }

        return setCommented;
    }()
};