var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var authorTestSchema = new mongoose.Schema
({
    "Test_Title":
    {
        "type":"string"
    },
    "company":
    {
        "type":"string"
    },
    "questions":
    {
        "type":"number"
    },
    "DateExam":
    {
        "type":"date"
    },
    "start_time":
    {
        "type":"string"
    },
    "end_time":
    {
        "type":"string"
    },
    "name":
    {
        "type":"string"
    }
    
})


authorTestSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
        this.deleted = false;
    }

    next();
});

module.exports = mongoose.model('authorTest', authorTestSchema);

