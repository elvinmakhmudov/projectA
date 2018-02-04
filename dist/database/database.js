'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config.json');
// var MongoClient = require('mongodb').MongoClient;
exports.default = {
    init: function init() {
        // let connect = MongoClient.connect(config.mongoDb);
        var connect = _mongoose2.default.connect(config.mongoDb + config.database);
        connect.then(function (db) {
            this.db = db;
            // this.dbase = db.db(config.database);
            // for(let i=0;i<config.collections.length;++i) {
            //     this.db.createCollection(config.collections[i], function(err, collection) {
            //             if (err) throw err;
            //             console.log(config.collections[i] + " collection created!");
            //     });
            // }
            console.log('Connected to the database');
        }.bind(this));
        return this;
    },
    getUsersToFollow: function getUsersToFollow() {
        return _user2.default.find({ type: 'follow', reviewed: false });
    },
    getUsersToLike: function getUsersToLike() {
        return _user2.default.find({ type: 'like', reviewed: false });
    },
    getUsersToAnalyze: function getUsersToAnalyze() {
        return _user2.default.find({ type: 'analyze', reviewed: false });
    },
    insertMany: function insertMany(collectionName, documents) {
        this.db.collection(collectionName).insertMany(documents, function (err, res) {
            console.log(err);
        });
        return this;
    }
};