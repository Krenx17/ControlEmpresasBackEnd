'use strict'

const Employee = require('../models/employee.model')
const employeeModel = Employee()

function addemployee(req, res){
    var params = req.body;
    if (req.user.rol === 'company'){
        if (params.name && params.job && params.department){
            employeeModel.company = req.user.sub
            employeeModel.name = params.name
            employeeModel.email = params.email
            employeeModel.celphone = params.celphone
            employeeModel.job = params.job
            employeeModel.department = params.department
            employeeModel.save((err, newEmployee)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (newEmployee) return res.status(200).send({newEmployee})
            })
        }else{
            return res.status(500).send({mesaje: 'Hacen falta datos'})
        }
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function editemployee(req, res){
    var idEmployee = req.params.idEmployee
    var params = req.body;
    if (req.user.rol === 'company'){
        Employee.findByIdAndUpdate(idEmployee, params, {new: true}, (err, employeeU)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (employeeU) return res.status(200).send({employeeU})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function deleteemployee(req, res){
    var idEmployee = req.params.idEmployee
    if (req.user.rol === 'company'){
        Employee.findByIdAndDelete(idEmployee, (err, employeeD)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (employeeD) return res.status(200).send({mesaje: 'El empleado a sido eliminado con exito'})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function allemployee(req, res){
    if (req.user.rol === 'company'){
        Employee.find({$or:[{company: req.user.sub}]}, (err, employees)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (employees) return res.status(200).send({employees})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function findemployeeid(req, res){
    var idEmployee = req.params.idEmployee
    if (req.user.rol === 'company'){
        Employee.findById(idEmployee, (err, employee)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (employee) return res.status(200).send({employee})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function findemployee(req, res){
    var params = req.body;
    if (req.user.rol === 'company'){
        if (params.name){
            Employee.find({$or: 
                [{name: params.name}, {empresa: req.user.sub}]
            }.exec((err, employees)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (employees) return res.status(200).send({employees})
            }))
        }
        if (params.puesto){
            Employee.find({$or: 
                [{puesto: params.puesto}, {empresa: req.user.sub}]
            }.exec((err, employees)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (employees) return res.status(200).send({employees})
            }))
        }
        if (params.department){
            Employee.find({$or: 
                [{department: params.department}, {empresa: req.user.sub}]
            }.exec((err, employees)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (employees) return res.status(200).send({employees})
            }))
        }
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function pdfemployee(req, res){
    var pdf = require("pdfkit")
    var fs = require("fs")
    var myDoc = new pdf();
    var params = req.body;
    if (req.user.rol === 'company'){
        Employee.find({$or:[{company: req.user.sub}]}, (err, employees)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (employees){ 
                //return res.status(200).send({employees})
                myDoc.pipe(fs.createWriteStream("empleados.pdf"))
                myDoc.font('Times-Italic', 12)
                    .text("Empresa: "+req.user.company)
                    .text("Teléfono: "+req.user.celphone)
                    .text("Email: "+req.user.email)
                    .moveDown()
                myDoc.font('Times-Bold', 20)
                    .text("Empleados",{
                        underline: true,
                        align: "center"
                    })
                employees.forEach(employee=>{
                    myDoc.font('Times-Roman', 12)
                        .moveDown()
                        .text("ID: "+employee._id)
                        .text("Nombre: "+employee.nombre)
                        .text("Apellido: "+employee.apellido)
                        .text("Puesto: "+employee.puesto)
                        .text("Departamento: "+employee.departamento)
                })
                myDoc.end();
                return res.status(200).send({mesaje: "PDF creado correctamente"})
            }else{
                return res.status(500).send({mesaje: "No existen empleados en esa empresa"})
            }
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

module.exports = {
    addemployee,
    editemployee,
    deleteemployee,
    allemployee,
    findemployeeid,
    findemployee,
    pdfemployee
}