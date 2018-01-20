const config = require('../config.json');
var MongoClient = require('mongodb').MongoClient;

export default {
    init() {
        let connect = MongoClient.connect(config.mongoDb);
        connect.then(function(db) {
            let dbase = db.db(config.database);
            for(let i=0;i<config.collections.length;++i) {
                dbase.createCollection(config.collections[i], function(err, collection) {
                        if (err) throw err;
                        console.log("Collection " + config.collections[i] + " created!");
                });
            }
            console.log('connected to the database');
        });
        return this;
    }
}
