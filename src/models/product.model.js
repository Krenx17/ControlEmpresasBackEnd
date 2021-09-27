const moongose = require('mongoose')
var Schema = moongose.Schema

var productSchema = Schema({
    company: {type: Schema.Types.ObjectId, ref: 'users'},
    product: String,
    provider: String,
    stock: Number,
    sold: Number
})

module.exports = moongose.model('products', productSchema)