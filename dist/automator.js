'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _InstagramAPI = require('./InstagramAPI.js');

var _InstagramAPI2 = _interopRequireDefault(_InstagramAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var async = require('async');

var Automater = function () {
    function Automater(login, password) {
        _classCallCheck(this, Automater);

        this.login = login;
        this.password = password;
        this.instagram = new _InstagramAPI2.default(login, password).init();
    }

    _createClass(Automater, [{
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
        key: 'savePosts',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var pages, i, username;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                _context2.next = 4;
                                return this.instagram.getPrivatePages();

                            case 4:
                                pages = _context2.sent;
                                i = 0;

                            case 6:
                                if (!(i < pages.length)) {
                                    _context2.next = 15;
                                    break;
                                }

                                username = pages[i].username;
                                //go to the username page

                                _context2.next = 10;
                                return this.instagram.goToUsername(username);

                            case 10:
                                _context2.next = 12;
                                return this.instagram.savePostsToAnalyze(username);

                            case 12:
                                i++;
                                _context2.next = 6;
                                break;

                            case 15:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function savePosts() {
                return _ref2.apply(this, arguments);
            }

            return savePosts;
        }()
    }, {
        key: 'getNewUsers',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.instagram.logIn();

                            case 2:
                                _context3.next = 4;
                                return this.instagram.getNewUsers();

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getNewUsers() {
                return _ref3.apply(this, arguments);
            }

            return getNewUsers;
        }()
    }]);

    return Automater;
}();

exports.default = Automater;