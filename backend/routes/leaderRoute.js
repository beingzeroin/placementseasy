var express = require('express')
var router =express.Router();
var submitQuizModel = require('../models/submitQuizModel')
var body = require('body-parser')
var mongoose = require('mongoose')
var dbConnectionString = process.env.PEASY_DB || 'mongodb://localhost:27017/peasy';
mongoose.connect(dbConnectionString)

var db = mongoose.connection;

router.route('/api')
    .get(function(req,res){
        submitQuizModel.aggregate({$group:{_id:"$UserId",score:{$sum:"$score"}}},{$sort:{score:-1}},
        function(err,results){
            if(err)
                res.send("error occured")
            else
                res.json(results)
        })
       
    })
    .post(function(req,res){
        var l = new submitQuizModel(req.body)
        l.save(function(err, obj){
            if(err)
                res.send('error while saving');
            else
                res.send("user created")

        })

    })
/*router.route('/api/:id')
    .get(function(req,res){
        db.collection('quizzes').aggregate({$match:{quizid:req.params.id}},{$group:{_id:"$userid",score:{$sum:"$score"}}},{$sort:{score:-1}},
        function(err,results){
            if(err)
                res.send("error occured")
            else
                res.json(results)
        })
    })

*/    
module.exports = router