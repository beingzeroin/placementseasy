var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var authorTestSchema = new mongoose.Schema
({
    "Test Title":
    {
        "type":"string"
    },
    "Company":
    {
        "type":"string"
    },
    "Questions":
    {
        "type":"number"
    },
    "Start Time":
    {
        "type":"date"
    },
    "End Time":
    {
        "type":"date"
    },
    
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

