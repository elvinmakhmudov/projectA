const config = require('../../config.json');
var MongoClient = require('mongodb').MongoClient;

export default {
    init() {
        let connect = MongoClient.connect(config.mongoDb);
        connect.then(function(db) {
            this.dbase = db.db(config.database);
            for(let i=0;i<config.collections.length;++i) {
                this.dbase.createCollection(config.collections[i], function(err, collection) {
                        if (err) throw err;
                        console.log(config.collections[i] + " collection created!");
                });
            }
            console.log('Connected to the database');
        }.bind(this));
        return this;
    },

    insertMany(collectionName, documents){
        this.dbase.collection(collectionName).insertMany(documents, function (err, res) {
            console.log(err);
        });
        return this;
    }
}
