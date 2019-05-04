const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const SALT_I = 10
const jwt = require('jsonwebtoken')
const {Serie} = require('../server/models/Serie')
const {Resena} = require('./models/resena')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const port = process.env.PORT || 3001

require('dotenv').config()

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true },(err) => {
    if(err) return err
    console.log("Conectado a MongoDB")
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.get('/Series/all', (req,res) => {
    Serie.find({}, (err, series) => {
        if(err) return res.status(400).send(err)
        res.status(200).send(series)
    })
})

app.post('/series/add', (req,res) => {
    const addserie =  new Serie(req.body)
    addserie.save((err,doc)=>{
        if(err) return res.json({succes: false, err})
        res.status(200).json({
            succes: true,
            addserie: doc
        })
    })
})

app.post("/Series/borrar/:titulo", (req,res)=>{
    const titulo = req.params.titulo
    //console.log(titulo)
    Serie.findOneAndDelete({'titulo':titulo}).then(datos =>{
        res.send(datos)
    })
})

app.post("/Series/actualizar/:titulo", (req,res) =>{
    const titulo = req.params.titulo    
    Serie.findOneAndUpdate(req.body).then(datos=>{
      res.send(datos)
    })
  })


app.post('/soyserie/resena', (req, res) => {
    const resena = new Resena(req.body)
    resena.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            resena: doc
        })
    })
})

/*app.put('/:id',async(req,res) => {
    const updateSerie = new Serie(req.body)
    await Task.findByIdAndUpdate(req.body,updateSerie)
    res.json({succes:true})
})*/



app.get('/soyserie/resenas', (req, res) => {
    Resena.find({}, (err, resena) => { 
        if(err) return res.status(400).send(err)
        res.status(200).send(resena)
    })
})

app.get("/soyserie/resena/:idresena", (req,res)=>{titulo
    const idBuscar = req.params.idresena
    console.log(idBuscar)
    Resena.find({'idresena': idBuscar}).then(datos =>{
    res.send(datos)
    })
  })


  app.get('/soyserie/resena/articles', (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'general'
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    
    Product
    .find()
    .populate('resenas')    
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, resenas) => {
        if(err) return res.status(400).send(err)
        res.send(resenas)
    })
})


