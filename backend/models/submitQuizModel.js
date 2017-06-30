var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var submitQuizSchema = new mongoose.Schema({
    "qId":[{ type: Schema.Types.ObjectId, ref: 'qId' }],
    "qNo":Number,
    "title":String,
    "description":String,
    "option":{
        A:String,
        B:String,
        C:String,
        D:String
    },
    "correctAnswer":String,
    "yourAnswer":String,
    "Explanation":String,
  
    //users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_at: Date,
    updated_at: Date,
    deleted: Boolean
          
           
});

submitQuizSchema.pre('save', function(next) {
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

module.exports = mongoose.model('submitQuiz', submitQuizSchema);