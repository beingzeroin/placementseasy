var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var submitQuizSchema = new mongoose.Schema(
   {
       "answers":[{
           "QuizId":Number,
            "QuestionId":Number,
             "Answered":Number
           
       }]
   }
       
 );

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