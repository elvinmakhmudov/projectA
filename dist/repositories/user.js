'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = require('../../config.json');
exports.default = {
    all: function all() {
        return _user2.default.find({});
    },
    analyze: function analyze(limit) {
        return _user2.default.find({
            type: 'analyze',
            reviewed: false
        });
    },
    follow: function follow(limit) {
        return _user2.default.find({
            type: 'follow',
            reviewed: true
        }).limit(limit || config.batchUserLimitCount);
    },
    unfollow: function unfollow(limit) {
        var d = new Date();
        d.setDate(d.getDate() - 7);
        var yesterdayInMseconds = Date.now() - d.getMilliseconds();
        return _user2.default.find({
            type: 'followed',
            reviewed: true,
            followed_at: {
                $lte: yesterdayInMseconds
            }
        }).limit(limit || config.batchUserLimitCount);
    },
    like: function like(limit) {
        return _user2.default.find({
            type: 'like',
            reviewed: true
        }).limit(limit || config.batchUserLimitCount);
    },
    insertMany: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(newUsers) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt('return', new Promise(function () {
                                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return _user2.default.insertMany(newUsers, function (err, users) {
                                                        if (err) return reject(err);
                                                        console.log(newUsers.length + ' users were added to collection');
                                                        return resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                }));

                                return function (_x2, _x3) {
                                    return _ref2.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function insertMany(_x) {
            return _ref.apply(this, arguments);
        }

        return insertMany;
    }(),
    setFollowed: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user, by) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            return _context4.abrupt('return', new Promise(function () {
                                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    _context3.next = 2;
                                                    return _user2.default.update({
                                                        username: user.username
                                                    }, {
                                                        $set: {
                                                            type: 'followed',
                                                            reviewed: true,
                                                            reviewed_at: Date.now(),
                                                            followed_by: by
                                                        }
                                                    }, function (err, users) {
                                                        if (err) return reject(err);
                                                        return resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, this);
                                }));

                                return function (_x6, _x7) {
                                    return _ref4.apply(this, arguments);
                                };
                            }()));

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function setFollowed(_x4, _x5) {
            return _ref3.apply(this, arguments);
        }

        return setFollowed;
    }(),
    setType: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user, type) {
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
                                                    return _user2.default.update({
                                                        username: user.username
                                                    }, {
                                                        $set: {
                                                            type: type,
                                                            reviewed: true,
                                                            reviewed_at: Date.now()
                                                        }
                                                    }, function (err, users) {
                                                        if (err) return reject(err);
                                                        return resolve();
                                                    });

                                                case 2:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, this);
                                }));

                                return function (_x10, _x11) {
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

        function setType(_x8, _x9) {
            return _ref5.apply(this, arguments);
        }

        return setType;
    }(),
    remove: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(user) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', _user2.default.remove({
                                username: user.username
                            }, function (err) {
                                if (err) console.log(err);
                                console.log(user.username + ' was removed');
                            }));

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function remove(_x12) {
            return _ref7.apply(this, arguments);
        }

        return remove;
    }(),
    softDelete: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(user) {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return this.setType(user, 'removed');

                        case 2:
                            return _context8.abrupt('return', _context8.sent);

                        case 3:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function softDelete(_x13) {
            return _ref8.apply(this, arguments);
        }

        return softDelete;
    }()
};