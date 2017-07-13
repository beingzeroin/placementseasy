const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const registerRouter = require('./backend/routes/registerRoute')
const loginRouter = require('./backend/routes/loginRoute');
const bzTemplateRouter = require('./backend/routes/bztemplateRoutes')
const questionRouter = require('./backend/routes/questionRoute')
const companyRouter = require('./backend/routes/companyRoute')
const authorTestRouter = require('./backend/routes/authorTestRoute')
const ieRouter = require('./backend/routes/ieRoutes')
const quizSumRouter = require('./backend/routes/quizSumRoutes')
const submitQuizRouter = require('./backend/routes/submitQuizRoutes')
const historyofTestsRouter = require('./backend/routes/historyofTestsRoutes')
const leaderRouter = require('./backend/routes/leaderRoute')
const movieRoutes = require('./backend/routes/movieRoutes')

var dbConnectionString = process.env.PEASY_DB || 'mongodb://localhost/peasy';

if (dbConnectionString === 'mongodb://localhost/peasy')
    console.log('Using Local Database');

mongoose.connect(dbConnectionString)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
    console.log('DB Connection Opened')
})
app.use(morgan('dev'))
app.set('view engine', 'pug')
app.set('views', './frontend/views')

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
app.use(express.static('frontend'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* ROUTES */
app.use('/leaderboard',leaderRouter); 
app.use('/bzTemplate', bzTemplateRouter);
app.use('/question', questionRouter);
app.use('/company', companyRouter);
app.use('/authorTest', authorTestRouter);
app.use('/ie', ieRouter);
app.use('/quizSum', quizSumRouter);
app.use('/submitQuiz', submitQuizRouter);
app.use('/historyofTests', historyofTestsRouter);
app.use('/api/movies', movieRoutes);
app.use('/register',registerRouter);
app.use('/login',loginRouter);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/views/index.html')
})

app.get('/index', function(req, res) {
    res.render('index');
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

/* ROUTES END */


/* Express Server */
const PORT = 3000;
app.listen(PORT, function() {
    console.log('Example app listening on port: ' + PORT);
})
