'use strict'

const productController = require('../controllers/product.controller')
const authentication  = require('../middlewares/authenticated')
const express = require('express')

var api = express.Router()
api.post('/addproduct', authentication.ensureAuth, productController.addproduct)
api.put('/editproduct/:idProduct', authentication.ensureAuth, productController.editproduct)
api.delete('/deleteproduct/:idProduct', authentication.ensureAuth, productController.deleteproduct)
api.get('/allproduct', authentication.ensureAuth, productController.allproduct)
api.get('/findproductid/:idProduct', authentication.ensureAuth, productController.findproductid)
api.get('/findproduct', authentication.ensureAuth, productController.findproduct)
api.put('/sellproduct', authentication.ensureAuth, productController.sellproduct)

module.exports = api