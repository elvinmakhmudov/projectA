'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _InstagramAPI = require('./InstagramAPI.js');

var _InstagramAPI2 = _interopRequireDefault(_InstagramAPI);

var _database = require('./database.js');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../config.json');

var Automater = function Automater(login, password) {
        _classCallCheck(this, Automater);

        this.login = login;
        this.password = password;
        this.dbase = _database2.default.init();
        this.instagram = new _InstagramAPI2.default(login, password).init().logIn();
};

exports.default = Automater;