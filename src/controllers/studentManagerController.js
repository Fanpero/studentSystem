const path = require('path');
const xtpl = require('xtpl');
const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'nodeStudy';

exports.getStudentListPage = (req,res) => {
    const keyword = req.query.keyword || "";
    // console.log(keyword);

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        const studentInfo = db.collection('studentInfo');

        studentInfo.find({name:{$regex: keyword}}).toArray((err,docs) => {
            client.close();

            xtpl.renderFile(path.join(__dirname,'../views/list.html'),{studentList: docs,keyword},(err,content) => {
                res.send(content);
            })
        })
    });
}