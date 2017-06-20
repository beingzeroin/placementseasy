const mongoose = require('mongoose');
const Schema = mongoose.Schema();

var companyModel = new Schema({
    name: String
})


module.exports = mongoose.model('Company', companyModel);