const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
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

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/views/index.html')
})

app.get('/partials/:partialPath', function(req, res) {
    res.sendFile(__dirname + '/frontend/partials/' + req.params.partialPath)
})

app.get('*', function(req, res) {
    res.send({ message: 'INVALID REQUEST' })
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})