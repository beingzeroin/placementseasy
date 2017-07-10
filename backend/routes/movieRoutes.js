const express = require('express')
const router = express.Router()

const model = require('../models/movieModel')

router.route('/')
    .get(function(req, res) {
        var query = {}; //{ deleted: false };
        model.find(query, function(err, allQuestions) {
            if (err)
                res.json({ 'message': 'error occured ' + err })
            else
                res.json(allQuestions);
        })

    })
    .post(function(req, res) {
        dbObj = new model(req.body)
        dbObj.save(dbObj, function(err, savedObject) {
            if (err)
                res.json({ 'message': 'error occured ' + err })
            else
                res.json(savedObject);
        })
    })

router.route('/:id')
    .get(function(req, res) {
        model.findById(req.params.id, function(err, obj) {
            if (err)
                res.json(err)
            else
                res.json(obj);
        })
    })
    .put(function(req, res) {

        var frontEndObj = req.body;
        model.findById(req.params.id, function(err, obj) {
            if (err)
                res.json(err)
            else {
                for (var p in frontEndObj) {
                    obj[p] = frontEndObj[p]
                }
                if (obj._id)
                    delete obj._id
                obj.save(function() {
                    res.json(obj);
                })
            }
        })

    })
    .delete(function(req, res) {
        model.findById(req.params.id, function(err, qObj) {
            if (err)
                res.status(500).send(err);
            else {
                qObj.deleted = true;
                // Save Updated Statement
                qObj.save(function(err) {
                    if (err)
                        res.status(500).send(err);
                    else {
                        res.status(200).send({ "status": "SUCCESS in delete : " + qObj });
                    }
                });
            }
        });
    })

module.exports = router;