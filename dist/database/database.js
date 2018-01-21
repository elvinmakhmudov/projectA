'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = require('../../config.json');
var MongoClient = require('mongodb').MongoClient;

exports.default = {
    init: function init() {
        var connect = MongoClient.connect(config.mongoDb);
        connect.then(function (db) {
            var _this = this;

            this.dbase = db.db(config.database);

            var _loop = function _loop(i) {
                _this.dbase.createCollection(config.collections[i], function (err, collection) {
                    if (err) throw err;
                    console.log("Collection " + config.collections[i] + " created!");
                });
            };

            for (var i = 0; i < config.collections.length; ++i) {
                _loop(i);
            }
            console.log('Connected to the database');
        }.bind(this));
        return this;
    },
    insertMany: function insertMany(collectionName, documents) {
        this.dbase.collection(collectionName).insertMany(documents, function (err, res) {
            console.log(err);
        });
        return this;
    }
};