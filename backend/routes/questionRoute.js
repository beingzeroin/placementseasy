var express = require('express');
var questionLib = require('../lib/questionLib');
var router = express.Router();


router.route('/all')
    .get(function(req, res) {
        res.sendFile('question/viewAll', { user: req.user });
    });

router.route('/create')
    .get(function(req, res) {
        res.sendFile('question/create', { user: req.user, questionId: null });
    });

router.route('/edit/:id')
    .get(function(req, res) {
        res.render('question/create', { user: req.user, questionId: req.params.id });
    });

router.route('/api')
    .get(questionLib.getAllQuestions)
    .post(questionLib.createQuestion);

router.route('/api/:id')
    .get(questionLib.getQuestion)
    .delete(questionLib.deleteQuestion);

module.exports = router;