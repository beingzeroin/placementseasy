var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var submitQuizSchema = new mongoose.Schema(
   {
      "QuizId": {type:String,required: true},
      "UserId":{type:String,required :true},
      "Uname":String,
       "answers":[{
            
            "QuestionId":Number,
            "Correct":Number,
             "Answered":Number
           
       }],
       "score":{
        type:Number,
        default:0
       }
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
     var scr=0;
    var i=0;
    while(i<this.answers.length)
    {
    if(this.answers[i].Correct==this.answers[i].Answered)
    {
    this.score=this.score+1
    }
    i++;
    }
   

    next();
});

module.exports = mongoose.model('submitQuiz', submitQuizSchema);