var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var quizSumSchema = new mongoose.Schema({

         
    
        attempted : Number,
        correct: Number,
        incorrect: Number,
        notAttempted:Number,
       
       
    /*  qNo :Number,
        title: String,
        attempted : Number,
        correct: Number,
        incorrect: Number,
        notAttempted: Number,
        correctAnswer: String,
        description: String,
        explanation:String,
        optionA: String,
        optionB: String,    
        optionC: String,
        optionD: String,
      */ 
 //users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_at: Date,
    updated_at: Date,
    deleted: Boolean
    
    });

quizSumSchema.pre('save', function(next) {
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

module.exports = mongoose.model('quizsummary', quizSumSchema);