'use strict'

const moongose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const app = require('./app')
const User = require('./src/models/user.model')
var userModel = User()

moongose.Promise = global.Promise
moongose.connect("mongodb+srv://root:root@controlempresas.uutsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    app.listen(process.env.PORT || 3000, function (){
        User.find({$or: [{user: "admin"}]}).exec((err, usernew)=>{
            if (usernew, usernew.length>=1){
                console.log('Ya existe un administrador')
            }else{
                userModel.user = "admin"
                userModel.rol = "admin"
                bcrypt.hash("123456", null, null, (err, encryptpass)=>{
                    userModel.password = encryptpass
                    userModel.save((err, saveUser)=>{
                        if(saveUser){
                            console.log("Se creo el usuario Admin")
                        }
                    })
                })
            }
        })
    })
}).catch(err=>console.log(err));