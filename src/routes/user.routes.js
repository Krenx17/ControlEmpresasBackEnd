'use strict'

const userController = require('../controllers/user.controller')
const authentication  = require('../middlewares/authenticated')
const express = require('express')

var api = express.Router()
api.post('/login', userController.login)
api.post('/addcompany', authentication.ensureAuth, userController.addcompany)
api.put('/editcompany/:idCompany', authentication.ensureAuth, userController.editcompany)
api.delete('/deletecompany/:idCompany', authentication.ensureAuth, userController.deletecompany)
api.get('/allcompanys', authentication.ensureAuth, userController.allcompany)
api.get('/findcompany/:idCompany', authentication.ensureAuth, userController.findcompany)

module.exports = api