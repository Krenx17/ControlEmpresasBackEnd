'use strict'

const employeeController = require('../controllers/employee.controller')
const authentication  = require('../middlewares/authenticated')
const express = require('express')

var api = express.Router()
api.post('/addemployee', authentication.ensureAuth, employeeController.addemployee)
api.put('/editemployee/:idEmployee', authentication.ensureAuth, employeeController.editemployee)
api.delete('/deleteemployee/:idEmployee', authentication.ensureAuth, employeeController.deleteemployee)
api.get('/allemployee', authentication.ensureAuth, employeeController.allemployee)
api.get('/findemployeeid/:idEmployee', authentication.ensureAuth, employeeController.findemployeeid)
api.get('/findemployee', authentication.ensureAuth, employeeController.findemployee)
api.get('/pdf', authentication.ensureAuth, employeeController.pdfemployee)

module.exports = api