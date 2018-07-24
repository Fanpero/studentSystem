const path = require('path');
const xtpl = require('xtpl');
const dbtools = require(path.join(__dirname,'../tools/dbtools'));

exports.getStudentListPage = (req,res) => {
    const keyword = req.query.keyword || "";
    // console.log(keyword);

    dbtools.findList('studentInfo',{name:{$regex: keyword}},(err,docs) => {
        xtpl.renderFile(path.join(__dirname, '../views/list.html'), { studentList: docs, keyword }, (err, content) => {
            res.send(content);
        })
    })

    // Use connect method to connect to the server
    // MongoClient.connect(url, function (err, client) {
    //     const db = client.db(dbName);

    //     const studentInfo = db.collection('studentInfo');

    //     studentInfo.find({name:{$regex: keyword}}).toArray((err,docs) => {
    //         client.close();

    //         xtpl.renderFile(path.join(__dirname,'../views/list.html'),{studentList: docs,keyword},(err,content) => {
    //             res.send(content);
    //         })
    //     })
    // });
}

exports.getAddStudentPage = (req,res) => {
    xtpl.renderFile(path.join(__dirname,'../views/add.html'),{},(err,content) => {
        res.send(content);
    })
}

exports.addStudent = (req,res) => {
    dbtools.insertOne('studentInfo',req.body,(err,result) => {
        if(result == null) {
            res.send("<script>alert('保存失败')</script>");
        } else {
            res.send('<script>window.location.href = "/studentManager/list"</script>')
        }
    })
}

exports.getEditStudentPage = (req,res) => {
    const studentId = req.params.studentId;

    console.log(studentId);

    dbtools.findOne('studentInfo')

    res.sent('text');
}