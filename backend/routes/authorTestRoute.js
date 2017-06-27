var express = require('express');
var authorTest = require('../lib/authorLib');
var router = express.Router();

router.route('/all')
    .get(function(req, res) {
        res.sendFile('authorTest/viewAll', { user: req.user });
    });

router.route('/create')
    .get(function(req, res) {
        res.sendFile('authorTest/create', { user: req.user, bzTemplateId: null });
    });

router.route('/edit/:id')
    .get(function(req, res) {
        res.render('authorTest/create', { user: req.user, bzTemplateId: req.params.id });
    });

router.route('/api')
    .get(authorTest.getAllTemplates)
    .put(authorTest.editTemplate)
    .post(authorTest.createTemplate);

router.route('/api/:id')
    .get(authorTest.getTemplate)
    .delete(authorTest.deleteTemplate);


module.exports = router;