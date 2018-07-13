const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname,'statics')));

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'));
app.use('/account',accountRouter);

app.listen(3000,'127.0.0.1',err => {
    if(err) {
        console.log(err);
    }

    console.log('start success');
})