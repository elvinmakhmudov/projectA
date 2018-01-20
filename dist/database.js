'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = require('../config.json');
var MongoClient = require('mongodb').MongoClient;

exports.default = {
    init: function init() {
        var connect = MongoClient.connect(config.mongoDb);
        connect.then(function (db) {
            var dbase = db.db(config.database);

            var _loop = function _loop(i) {
                dbase.createCollection(config.collections[i], function (err, collection) {
                    if (err) throw err;
                    console.log("Collection " + config.collections[i] + " created!");
                });
            };

            for (var i = 0; i < config.collections.length; ++i) {
                _loop(i);
            }
            console.log('connected to the database');
        });
        return this;
    }
};