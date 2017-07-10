var historyofTests = require('../models/historyofTests');

exports.getAllTemplates = function(req, res) {
    historyofTests.find(req.query).populate('users').exec(function(err, dbItems) {
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
    var ti = new historyofTests(req.body);
    ti.save(function(err) {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(ti);
    });
};

exports.getTemplate = function(req, res) {
    console.log("Getting Group " + req.params.id);
    historyofTests.findById(req.params.id, function(err, cObj) {
        // Return Object
        if (err) {
            historyofTests.findOne({ 'title': req.params.title }, function(error, tObj) {
                if (error)
                    res.status(500).send(error);
                else
                    res.status(200).send(tObj);
            });

        } else
            res.status(200).send(cObj);
    });
};

