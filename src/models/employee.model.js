const moongose = require('mongoose')
var Schema = moongose.Schema

var employeeSchema = Schema({
    company: {type: Schema.Types.ObjectId, ref: 'users'},
    name: String,
    email: String,
    celphone: Number,
    job: String,
    department: String
})

module.exports = moongose.model('employees', employeeSchema)