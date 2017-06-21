var express = require('express');
var questionLib = require('../lib/questionLib');
var router = express.Router();


router.route('/api')
    .get(questionLib.getAllQuestions)
    .post(questionLib.createQuestion);




module.exports = router;