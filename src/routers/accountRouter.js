const express = require('express');
const path = require('path');

const accountRouter = express.Router();

const accountCTRL = require(path.join(__dirname,'../controllers/accountController.js'));

accountRouter.get('/login',accountCTRL.getLoginPage);

accountRouter.get('/vcode',accountCTRL.getVcodeImg);

module.exports = accountRouter;