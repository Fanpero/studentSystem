const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'nodeStudy';

const getCollection = (collectionName,callback) => {
    MongoClient.connect(url,{userNewUrlParse: true},function (err,client) {
        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        callback(client,collection);
    })
}


exports.insertOne = (collectionName,data,callback) => {
    MongoClient.connect(url,{userNewUrlParse: true},function (err,client) {
        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        collection.insertOne(data,(err,result) => {
            client.close();

            callback(err,result);
        })
    })
}

exports.findOne = (collectionName,data,callback) => {
    MongoClient.connect(url,{userNewUrlParse: true},function (err,client) {
        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        collection.findOne(data,(err,result) => {
            client.close();

            callback(err,result);
        })
    })
}

exports.findList = (collectionName,data,callback) => {
    getCollection(collectionName,(client,collection) => {
        collection.find(data).toArray((err, docs) => {
            client.close();

            callback(err, docs);
        })
    })

    // MongoClient.connect(url,{userNewUrlParse: true},function (err,client) {
    //     const db = client.db(dbName);

    //     const collection = db.collection(collectionName);

    //     collection.find(data).toArray((err,docs) => {
    //         client.close();

    //         callback(err,docs);
    //     })
    // })
}

