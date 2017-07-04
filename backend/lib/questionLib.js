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


exports.editQuestion = function(req, res) {
    console.log('Edit ' + req.params.id);
    QuestionModel.findById(req.params.id, function(err, cObj) {
        if (err)
            res.status(500).send(err);
        else {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                cObj[p] = req.body[p];
            }

            // Save Updated Statement
            cObj.save(function(err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(cObj);
            });
        }
    });
};

exports.getQuestion = function(req, res) {
    console.log("Getting Group " + req.params.id);
    QuestionModel.findById(req.params.id, function(err, cObj) {
        // Return Object
        if (err) {
            QuestionModel.findOne({ 'title': req.params.title }, function(error, tObj) {
                if (error)
                    res.status(500).send(error);
                else
                    res.status(200).send(tObj);
            });

        } else
            res.status(200).send(cObj);
    });
};

exports.deleteQuestion = function(req, res) {

    console.log('Delete ' + req.params.id);
    QuestionModel.findById(req.params.id, function(err,qObj) {
        if (err)
            res.status(500).send(err);
        else {
            qObj.deleted = true;
            // Save Updated Statement
            qObj.save(function(err) {
                if (err)
                    res.status(500).send(err);
                else{
                    res.status(200).send({"status":"SUCCESS in delete : "+qObj});
                    
                }
            });
        }
    });
};