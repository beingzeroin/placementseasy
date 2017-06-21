var QuestionModel = require('../models/question');

exports.getAllQuestions = function(req, res) {
    QuestionModel.find(req.query).exec(function(err, dbItems) {
        //console.log(dbItems);
        if (err)
            res.status(500).send(err);
        else {
            res.json({ items: dbItems });
        }
    });
};

exports.createQuestion = function(req, res) {
    //console.log(req.body);
    var q = new QuestionModel(req.body);
    q.save(function(err) {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(q);
    });
};
