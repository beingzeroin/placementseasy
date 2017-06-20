const express = require('express')

var routes = function() {

    var companyRouter = express.Router;

    companyRouter.route('/company')
        .post(function(req, res) {

        })
        .get(function(req, res) {

        })

    companyRouter.route('/company/:companyId')
        .put(function(req, res) {

        })
        .get(function(req, res) {

        })
        .delete(function(req, res) {

        })
}

module.exports = routes();