var express = require('express');
var quizSumTemplateLib = require('../lib/quizSumTemplateLib');
var quizSumModel = require('../models/quizSumModel')


var router = express.Router();

router.route('/')
    .get(function(req, res) {
    console.log('getting all quizzes')
     quizSumModel.find({},function(err,allSummary){
            
              if(err)
                  res.json({'message':'there is an error'})
                  else
                      res.json(allSummary)
           
           })

          });

router.route('/api')
    .get(quizSumTemplateLib.getAllTemplates)
    .put(quizSumTemplateLib.editTemplate)
   .post(quizSumTemplateLib.createTemplate);

router.route('/api/:id')
    .get(quizSumTemplateLib.getTemplate)
    .delete(quizSumTemplateLib.deleteTemplate);
  


module.exports = router;