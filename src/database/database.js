const config = require('../../config.json');
import User from '../models/user';
import Post from '../models/post';
import Page from '../models/page';

// var MongoClient = require('mongodb').MongoClient;
import mongoose from 'mongoose';

export default {
    init() {
        let connect = mongoose.connect(config.mongoDb + config.database);
        connect.then(function (db) {
            this.db = db;
            console.log('Connected to the database');
        }.bind(this));
        return this;
    }
}