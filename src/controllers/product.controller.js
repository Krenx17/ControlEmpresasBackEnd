'use strict'

const Product = require('../models/product.model')
const productModel = Product()

function addproduct(req, res){
    var params = req.body;
    delete params.sold
    if (req.user.rol === 'company'){
        if (params.product, params.provider, params.stock){
            productModel.company = req.user.sub
            productModel.product = params.product
            productModel.provider = params.provider
            productModel.stock = params.stock
            productModel.sold = 0
            productModel.save((err, newProduct)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (newProduct) return res.status(200).send({newProduct})
            })
        }else{
            return res.status(500).send({mesaje: 'Hacen falta datos'})
        }
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function editproduct(req, res){
    var idProduct = req.params.idProduct
    var params = req.body
    if (req.user.rol === 'company'){
        Product.findByIdAndUpdate(idProduct, params, {new: true}, (err, productU)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (productU) return res.status(200).send({productU})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function deleteproduct(req, res){
    var idProduct = req.params.idProduct
    if (req.user.rol === 'company'){
        Product.findByIdAndDelete(idProduct, (err, productD)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (productD) return res.status(200).send({mesaje: 'El producto a sido eliminado con exito'})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function allproduct(req, res){
    if (req.user.rol === 'company'){
        Product.find({$or:[{company: req.user.sub}]} ,(err, products)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (products) return res.status(200).send({products})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function findproductid(req, res){
    var idProduct = req.params.idProduct
    if (req.user.rol === 'company'){
        Product.findById(idProduct, (err, product)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (product) return res.status(200).send({product})
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function findproduct(req, res){
    var params = req.body;
    if (req.user.rol === 'company'){
        if (params.product){
            Product.find({$or: 
                [{company: req.user.sub}, {provider: params.product}]
            }).exec((err, products)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (products) return res.status(200).send({products})
            })
        }
        if (params.provider){
            Product.find({$or: 
                [{company: req.user.sub}, {provider: params.provider}]
            }).exec((err, products)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (products) return res.status(200).send({products})
            })
        }
        if (params.stock){
            Product.find({$or: 
                [{company: req.user.sub}, {stock: params.stock}]
            }).exec((err, products)=>{
                if (err) return res.status(500).send({mesaje:"Error en la petición"})
                if (products) return res.status(200).send({products})
            })
        }
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

function sellproduct(req, res){
    var idProduct = req.params.idProduct
    var params = req.body
    if (req.user.rol === 'company'){
        Product.findById(idProduct, (err, product)=>{
            if (err) return res.status(500).send({mesaje:"Error en la petición"})
            if (params.sold<=product.stock && params.sold>=1){
                params.stock = parseInt(params.stock)-product.stock
                params.sold = parseInt(params.sold)+product.sold
                Product.findByIdAndUpdate(idProduct, params, {new: true}, (err, productU)=>{
                    if (err) return res.status(500).send({mesaje:"Error en la petición"})
                    if (productU) return res.status(200).send({productU})
                })
            }else{
                return res.status(500).send({mesaje: 'No hay stock suficiente'})
            }
        })
    }else{
        return res.status(500).send({mesaje: 'No posees los permisos necesarios'})
    }
}

module.exports = {
    addproduct,
    editproduct,
    deleteproduct,
    allproduct,
    findproductid,
    findproduct,
    sellproduct
}