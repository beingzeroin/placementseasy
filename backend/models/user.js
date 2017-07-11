var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    "username" : { "type":"string" ,"lowercase":"true", "required":"true", "unique":"true" },
    "password" : {"type":"string", "required" :"true"},
    "email" : {"type" :"string" , "required":"true" ,"unique":"true"}
})

module.exports = mongoose.model('User', UserSchema);
