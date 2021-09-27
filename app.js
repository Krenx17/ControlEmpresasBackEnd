'use strict'

//varibales globales
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

//middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//cabeceras
app.use(cors())

//importación de rutas
const User_Routes = require('./src/routes/user.routes')
const Employee_Routes = require('./src/routes/employee.routes')
const Product_Routes = require('./src/routes/product.routes')

//carga de rutas
app.use('/api', User_Routes)
app.use('/api', Employee_Routes)
app.use('/api', Product_Routes)

//exportación de rutas
module.exports = app