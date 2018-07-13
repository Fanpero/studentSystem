const path = require('path');
const captchapng = require('captchapng');
const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'nodeStudy';



exports.getLoginPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../views/login.html'));
}

exports.getVcodeImg = (req,res) => {
    const random = parseInt(Math.random()*9000+1000)
    var p = new captchapng(80,30,random); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
}

exports.getRegisterPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../views/register.html'));
}

exports.register = (req,res) => {
    const flag = {status: 0,message: '注册成功'};

    const {username,password} =req.body;

    MongoClient.connect(url,{userNewUrlParse: true},function (err,client) {
        const db = client.db(dbName);

        const accountInfo = db.collection('accountInfo');

        accountInfo.findOne({username},(err,doc) => {
            if(doc != null) {
                flag.status = 1;
                flag.message = '用户名已存在';

                client.close();
                res.json(flag);
            } else {
                accountInfo.insertOne(req.body,(err,result) => {
                    if(result == null) {
                        flag.status = 2;
                        flag.message = '注册失败';
                    }

                    client.close();
                    res.json(flag);
                })
            }
        })
    })
}