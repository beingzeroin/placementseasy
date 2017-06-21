var express = require('express');
var bzTemplateLib = require('../lib/bzTemplateLib');
var router = express.Router();

router.route('/all')
    .get(function(req, res) {
        res.sendFile('bzTemplate/viewAll', { user: req.user });
    });

router.route('/create')
    .get(function(req, res) {
        res.sendFile('bzTemplate/create', { user: req.user, bzTemplateId: null });
    });

router.route('/edit/:id')
    .get(function(req, res) {
        res.render('bzTemplate/create', { user: req.user, bzTemplateId: req.params.id });
    });

router.route('/api')
    .get(bzTemplateLib.getAllTemplates)
    .put(bzTemplateLib.editTemplate)
    .post(bzTemplateLib.createTemplate);

router.route('/api/:id')
    .get(bzTemplateLib.getTemplate)
    .delete(bzTemplateLib.deleteTemplate);


module.exports = router;