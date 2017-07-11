const mongoose = require('mongoose')

movieSchema = mongoose.Schema({
    'title': String,
    'director': String,
    'releaseYear': Number,
    'genre': String
})

module.exports = mongoose.model('Movie', movieSchema);