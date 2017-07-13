var mongoose = require('mongoose')
var schema = mongoose.Schema

var quiz = new schema({
    quizid:Number,
    userid:Number,
    answers:[{
        quesid:{
            type:Number
        },
        correct:{
            type:Number
        },
        attempted:{
            type:Number
        }
    }
    ],
    score:{
        type:Number,
        default:0
    }
})

quiz.pre('save',function(next){
    var scr=0;
    var i=0;
    while(i<this.answers.length)
    {
    if(this.answers[i].correct==this.answers[i].attempted)
    {
    this.score=this.score+1
    }
    i++;
    }
    
    next()
})

module.exports=mongoose.model('Quiz',quiz)