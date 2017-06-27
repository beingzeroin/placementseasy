const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const bzTemplateRouter = require('./backend/routes/bztemplateRoutes')
const questionRouter = require('./backend/routes/questionRoute')
const authorTestRouter = require('./backend/routes/authorTestRoute')

const interviewRouter = require('./backend/routes/interviewRoutes')
const quizSumRouter = require('./backend/routes/quizSumRoutes')

const interviewRouter = require('./backend/routes/interviewRoutes')
const quizSumRouter = require('./backend/routes/quizSumRoutes')

mongoose.connect('mongodb://localhost/peasy')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
    console.log('DB Connection Opened')
})
app.use(morgan('dev'))

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
app.use(express.static('frontend'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* ROUTES */
app.use('/bzTemplate', bzTemplateRouter);
app.use('/question', questionRouter);
app.use('/authorTest', authorTestRouter);

app.use('/interview', interviewRouter);

app.use('/quizSum',quizSumRouter);


app.use('/interview', interviewRouter);

app.use('/quizSum',quizSumRouter);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/views/index.html')
})

app.get('/partials/:partialPath', function(req, res) {
    res.sendFile(__dirname + '/frontend/partials/' + req.params.partialPath)
})
app.get('/data/:dataFileName', function(req, res) {
    res.sendFile(__dirname + '/frontend/static/data/' + req.params.dataFileName)
})
app.get('*', function(req, res) {
    res.send({ message: 'INVALID REQUEST' })
})

app.listen(9000, function() {
    console.log('Example app listening on port 9000!')
})