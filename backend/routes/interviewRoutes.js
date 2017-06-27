var express = require('express');
var interviewLib = require('../lib/interviewLib');
var router = express.Router();

router.route('/all')
    .get(function(req, res) {
        res.sendFile('interview/viewAll', { user: req.user });
    });

router.route('/create')
    .get(function(req, res) {
        res.sendFile('interview/create', { user: req.user, bzTemplateId: null });
    });

router.route('/edit/:id')
    .get(function(req, res) {
        res.render('interview/create', { user: req.user, bzTemplateId: req.params.id });
    });

router.route('/api')
    .get(interviewLib.getAllTemplates)
    .put(interviewLib.editTemplate)
    .post(interviewLib.createTemplate);

router.route('/api/:id')
    .get(interviewLib.getTemplate)
    .delete(interviewLib.deleteTemplate);


module.exports = router;