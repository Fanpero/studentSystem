const express = require('express');
const path = require('path');

const studengManagerRouter = express.Router();

const studengManagerCTRL = require(path.join(__dirname,'../controllers/studentManagerController'));

studengManagerRouter.get('/list',studengManagerCTRL.getStudentListPage)

module.exports = studengManagerRouter;