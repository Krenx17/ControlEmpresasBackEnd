const moongose = require('mongoose')
var Schema = moongose.Schema

var userSchema= Schema({
    company: String,
    celphone: Number,
    email: String,
    user: String,
    password: String,
    rol: String
})

module.exports = moongose.model('users', userSchema)