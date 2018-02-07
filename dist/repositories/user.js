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
    analyze: function analyze(limit) {
        return _user2.default.find({
            type: 'analyze',
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },
    follow: function follow(limit) {
        return _user2.default.find({
            type: 'follow',
            reviewed: true
        }).limit(limit || config.batchUserLimitCount);
    },
    unfollow: function unfollow(limit) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
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
            reviewed: false
        }).limit(limit || config.batchUserLimitCount);
    },
    insertMany: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newUsers) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', new Promise(function (resolve, reject) {
                                console.log('in insertmany :' + newUsers.length);
                                _user2.default.insertMany(newUsers, function (err, users) {
                                    if (err) reject();
                                    resolve();
                                    console.log(newUsers.length + ' users were added to collection');
                                });
                            }));

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function insertMany(_x) {
            return _ref.apply(this, arguments);
        }

        return insertMany;
    }(),
    setType: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, type) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _user2.default.update({
                                username: user.username
                            }, {
                                $set: {
                                    type: type,
                                    reviewed: true,
                                    reviewed_at: Date.now()
                                }
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

        function setType(_x2, _x3) {
            return _ref2.apply(this, arguments);
        }

        return setType;
    }(),
    remove: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', _user2.default.remove({
                                username: user.username
                            }, function (err) {
                                if (err) console.log(err);
                                console.log(user.username + ' was removed');
                            }));

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function remove(_x4) {
            return _ref3.apply(this, arguments);
        }

        return remove;
    }()
};