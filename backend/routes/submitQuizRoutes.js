var express = require('express');
var submitQuizLib = require('../lib/submitQuizTemplateLib');
var router = express.Router();
var submitQuizModel = require('../models/submitQuizModel')


router.route('/api')
     .get(submitQuizLib.getAllTemplates)
     .put(submitQuizLib.editTemplate)
     .post(submitQuizLib.createTemplate);

router.route('/api/:id')
    .get(submitQuizLib.getTemplate)
    .delete(submitQuizLib.deleteTemplate);


module.exports = router;