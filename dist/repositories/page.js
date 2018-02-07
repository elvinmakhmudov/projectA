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
        return _page2.default.remove({
            username: page.username
        }, function (err) {
            if (err) console.log(err);
            console.log(page.username + ' was removed.');
        });
    },
    private: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var d, yesterdayInMseconds;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            d = new Date();

                            d.setDate(d.getDate() - config.oldestPageInDays);
                            yesterdayInMseconds = Date.now() - d.getMilliseconds();
                            return _context.abrupt('return', _page2.default.find({
                                reviewed: false,
                                reviewed_at: {
                                    $lt: yesterdayInMseconds
                                },
                                type: 'private'
                            }));

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function _private() {
            return _ref.apply(this, arguments);
        }

        return _private;
    }(),
    setReviewed: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _page2.default.update({
                                username: page.username
                            }, {
                                $set: {
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

        function setReviewed(_x) {
            return _ref2.apply(this, arguments);
        }

        return setReviewed;
    }()
};