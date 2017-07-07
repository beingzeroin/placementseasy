var express = require('express');
var historyOfTestsLib = require('../lib/historyOfTestsLib');
var router = express.Router();

router.route('/all')
    .get(function(req, res) {
        res.sendFile('historyofTests/viewAll', { user: req.user });
    });

router.route('/create')
    .get(function(req, res) {
        res.sendFile('historyofTests/create', { user: req.user, historyofTestsId: null });
    });

router.route('/api')
    .get(historyOfTestsLib.getAllTemplates)
    .post(historyOfTestsLib.createTemplate);

router.route('/api/:id')
    .get(historyOfTestsLib.getTemplate);



module.exports = router;