var express = require('express');
var submitQuizLib = require('../lib/submitQuizTemplateLib');
var router = express.Router();
var submitQuizModel = require('../models/submitQuizModel')

var mongoose = require('mongoose')
var dbConnectionString = process.env.PEASY_DB || 'mongodb://localhost:27017/peasy';
mongoose.connect(dbConnectionString)

var db = mongoose.connection;

router.route('/api')
     .get(submitQuizLib.getAllTemplates)
    .put(submitQuizLib.editTemplate)
   .post(submitQuizLib.createTemplate);

router.route('/api/:id')
    .get(submitQuizLib.getTemplate)
    .delete(submitQuizLib.deleteTemplate);

router.route('/abc/:id')
    .get(function(req,res){
        console.log(req.params.id)
        db.collection('submitquizzes').aggregate({$match:{QuizId:req.params.id}},{$group:{_id:"$Uname",score:{$sum:"$score"}}},{$sort:{score:-1}},
        function(err,results){
            if(err)
                res.send("error occured")
            else{
                console.log(results)
                res.json(results)
            }
        })
    })
    .post(function(req,res){
        var sub = new submitQuizModel(req.body);
        sub.save();
    })


module.exports = router;