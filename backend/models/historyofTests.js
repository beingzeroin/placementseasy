var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var historyofTestsSchema = new mongoose.Schema({
    
        "userid":{
            "type": "number"
        },
        "quizid":{
            "type": "number"
        },
         "score":{
           "type" : "number"
        },
    //users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_at: Date,
    updated_at: Date,
    deleted: Boolean
});

historyofTestsSchema.pre('save', function(next) {
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

module.exports = mongoose.model('historyofTests', historyofTestsSchema);