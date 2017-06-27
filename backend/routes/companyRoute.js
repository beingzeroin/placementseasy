var express = require('express');
var companyLib = require('../lib/companyLib');
var router = express.Router();

router.route('/all')
    .get(function(req, res) {
        res.sendFile('company/viewAll', { user: req.user });
    });

router.route('/create')
    .get(function(req, res) {
        res.sendFile('company/create', { user: req.user, companyId: null });
    });

router.route('/edit/:id')
    .get(function(req, res) {
        res.render('company/create', { user: req.user, companyId: req.params.id });
    });

router.route('/api')
    .get(companyLib.getAllTemplates)
    .put(companyLib.editTemplate)
    .post(companyLib.createTemplate);

router.route('/api/:id')
    .get(companyLib.getTemplate)
    .delete(companyLib.deleteTemplate);


module.exports = router;