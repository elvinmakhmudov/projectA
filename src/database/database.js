const config = require('../../config.json');
// var MongoClient = require('mongodb').MongoClient;
import mongoose from 'mongoose';

export default {
    init() {
        // let connect = MongoClient.connect(config.mongoDb);
        let connect = mongoose.connect(config.mongoDb+config.database);
        connect.then(function(db) {
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

    insertMany(collectionName, documents){
        this.db.collection(collectionName).insertMany(documents, function (err, res) {
            console.log(err);
        });
        return this;
    }
}
