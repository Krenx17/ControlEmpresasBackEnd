'use strict'

const User = require('../models/user.model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../service/jwt')
const userModel = User()

function login(req, res){
    var params = req.body;
    User.findOne({user: params.user}, (err, obtainedUser)=>{
        if (err) return res.status(500).send({mesaje:"Error en la petición"})
        if(obtainedUser){
            bcrypt.compare(params.password, obtainedUser.password,(err,correctPass)=>{
                if(correctPass){
                    if(params.getToken === "true"){
                        return res.status(200).send({token: jwt.createToken(obtainedUser)})
                    } else{
                        obtainedUser.password=undefined;
                        return res.status(200).send({ obtainedUser })
                    }
                }else{
                    return res.status(404).send({mesaje: "El usuario no se ha podido identificar"})
                }
            })
        }else{
            return res.status(404).send({mesaje: "El usuario no existe"})
        }
    })
}

function addcompany(req, res){
    var params = req.body;
    if (req.user.rol === 'admin'){
        userModel.company = params.company
        userModel.celphone = params.celphone
        userModel.email = params.email
        userModel.rol = 'company'
        User.find({$or:[{user: params.user}]}).exec((err, userF)=>{
            if (err) return res.status(500).send({mesaje: 'Error en la petición'})
            if (userF && userF.length>=1){
                return res.status(500).send({mesaje: 'Ya existe ese usuario'})
            }else{
                userModel.user = params.user
                bcrypt.hash(params.password, null, null, (err, encryptpass)=>{
                    if (err) return res.status(500).send({mesaje: 'Error al encriptar la contraseña'})
                    userModel.password = encryptpass
                    userModel.save((err, newCompany)=>{
                      if (err) return res.status(500).send({mesaje: 'Error al crear la empresa'})
                      if (newCompany) return res.status(200).send({newCompany})
                    })
                })
            }
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function editcompany(req, res){
    var params = req.body;
    var idCompany = req.params.idCompany
    delete params.password
    if (req.user.rol === 'admin'){
        User.findByIdAndUpdate(idCompany, params, {new: true}, (err, companyE)=>{
            if (err) return res.status(500).send({mesaje: 'Error al actualizar la empresa'})
            if (companyE) return res.status(200).send({companyE})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function deletecompany(req, res){
    var idCompany = req.params.idCompany
    if (req.user.rol === 'admin'){
        User.findByIdAndDelete(idCompany, (err, companyD)=>{
            if (err) return res.status(500).send({mesaje: 'Error al eliminar la empresa'})
            if (companyD) return res.status(200).send({mesaje: 'La empresa se a eliminado con exito'})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function allcompany(req, res){
    if (req.user.rol === 'admin'){
        User.find({$or: 
            [{rol: 'company'}]
        }).exec((err, companys)=>{
           if (err) return res.status(500).send({mesaje: 'Error en la petición'})
           if (companys) return res.status(200).send({companys})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function findcompany(req, res){
    var idCompany = req.params.idCompany
    if (req.user.rol === 'admin'){
        User.findById(idCompany, (err, companyF)=>{
            if (err) return res.status(500).send({mesaje: 'Error en la petición'})
            if (companyF) return res.status(200).send({companyF})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

module.exports = {
    login, 
    addcompany, 
    editcompany,
    deletecompany,
    allcompany,
    findcompany
}