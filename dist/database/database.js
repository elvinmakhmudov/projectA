'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _page = require('../models/page');

var _page2 = _interopRequireDefault(_page);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config.json');

// var MongoClient = require('mongodb').MongoClient;
exports.default = {
    init: function init() {
        var connect = _mongoose2.default.connect(config.mongoDb + config.database);
        connect.then(function (db) {
            this.db = db;
            console.log('Connected to the database');
        }.bind(this));
        return this;
    }
};