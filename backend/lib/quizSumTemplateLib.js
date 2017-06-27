var quizSumModel = require('../models/quizSumModel');

exports.getAllTemplates = function(req, res) {
    quizSumModel.find(req.query).populate('users').exec(function(err, dbItems) {
        //console.log(dbItems);
        if (err)
            res.status(500).send(err);
        else {
            res.json({ items: dbItems });
        }
    });
};

exports.createTemplate = function(req, res) {
    //console.log(req.body);
    var ti = new quizSumModel(req.body);
    ti.save(function(err) {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(ti);
    });
};

exports.editTemplate = function(req, res) {
    console.log('Edit ' + req.body._id);
    quizSumModel.findById(req.body._id, function(err, cObj) {
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

exports.getTemplate = function(req, res) {
    console.log("Getting Group " + req.params.id);
    quizSumModel.findById(req.params.id, function(err, cObj) {
        // Return Object
        if (err) {
            quizSumModel.findOne({ 'title': req.params.title }, function(error, tObj) {
                if (error)
                    res.status(500).send(error);
                else
                    res.status(200).send(tObj);
            });

        } else
            res.status(200).send(cObj);
    });
};

exports.deleteTemplate = function(req, res) {

    console.log('Delete ' + req.params.id);
    quizSumModel.findById(req.params.id, function(err, cObj) {
        if (err)
            res.status(500).send(err);
        else {
            cObj.deleted = true;
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