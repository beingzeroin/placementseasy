var authorTest = require('../models/authorTest');
var body = require('body-parser');
exports.getAllTemplates = function(req, res) {
    authorTest.find(req.query).populate('users').exec(function(err, dbItems) {
        console.log(dbItems);
        if (err)
            res.status(500).send(err);
        else {
            res.json({ items: dbItems });
        }
    });
};

exports.createTemplate = function(req, res) {
    console.log("\n\nbody:"+req.body);
    var ti = new authorTest(req.body);
    ti.save(function(err) {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(ti);
    });
};

exports.editTemplate = function(req, res) {
    console.log('Edit ' + req.body._id);
    authorTest.findById(req.body._id, function(err, cObj) {
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
    authorTest.findById(req.params.id).populate('questions').exec( function(err, cObj) {
        // Return Object
        if (err) {
            authorTest.findOne({ 'title': req.params.title }, function(error, tObj) {
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
    authorTest.findById(req.params.id, function(err, cObj) {
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