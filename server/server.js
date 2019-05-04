const mongoose = require ('mongoose')
const express = require('express')
const {Resena} = require('./models/resena')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, 'useCreateIndex' : true }, (err) => {
    if(err) return err
    console.log("Conectado a MongoDB")
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

app.get('/soyserie/resenas', (req, res) => {
    Resena.find({}, (err, resena) => { 
        if(err) return res.status(400).send(err)
        res.status(200).send(resena)
    })
})

app.get("/soyserie/resena/:idresena", (req,res)=>{
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

const port = process.env.PORT || 3005
  
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
