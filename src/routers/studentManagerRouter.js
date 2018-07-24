const express = require('express');
const path = require('path');

const studengManagerRouter = express.Router();

const studengManagerCTRL = require(path.join(__dirname,'../controllers/studentManagerController'));

studengManagerRouter.get('/list',studengManagerCTRL.getStudentListPage);

studengManagerRouter.get('/add',studengManagerCTRL.getAddStudentPage);

studengManagerRouter.post('/add',studengManagerCTRL.addStudent);

studengManagerRouter.post('/edit/:studentId',studengManagerCTRL.getEditStudentPage)

module.exports = studengManagerRouter;