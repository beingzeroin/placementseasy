var express = require('express');
var ieLib = require('../lib/ieLib');
var router = express.Router();

router.route('/all')
    .get(function(req, res) {
        res.sendFile('ie/viewAll', { user: req.user });
    });

router.route('/create')
    .get(function(req, res) {
        res.sendFile('ie/create', { user: req.user, bzTemplateId: null });
    });

router.route('/edit/:id')
    .get(function(req, res) {
        res.render('ie/create', { user: req.user, bzTemplateId: req.params.id });
    });

router.route('/api')
    .get(ieLib.getAllIEs)
    .put(ieLib.editIE)
    .post(ieLib.createIE);

router.route('/api/:id')
    .get(ieLib.getIE)
    .delete(ieLib.deleteIE);


module.exports = router;