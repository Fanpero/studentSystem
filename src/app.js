const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const session = require('express-session');

const app = express();

app.use(express.static(path.join(__dirname,'statics')));

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

// Use the session middleware
app.use(session({ secret: 'keyboard cat', resave:true, saveUninitialized:true, cookie: { maxAge: 600000 }}));

const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'));
const studentManagerRouter = require(path.join(__dirname,'/routers/studentManagerRouter.js'));
app.use('/account',accountRouter);
app.use('/studentManager',studentManagerRouter);

app.listen(3000,'127.0.0.1',err => {
    if(err) {
        console.log(err);
    }

    console.log('start success');
})