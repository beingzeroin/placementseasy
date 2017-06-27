var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var interviewSchema = new mongoose.Schema({
    "Company name": {
            "type": "string"
        },
	    "Date visited": {          
  			"type": "date"
		},
        "College name": {
            "type": "string"
        },
        "Description": {
            "type": "string"
        },
        
        "Explanation": {
            "type": "string"
        },
        
    created_at: Date,
    updated_at: Date,
    deleted: Boolean
});

interviewSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Interview', interviewSchema);

