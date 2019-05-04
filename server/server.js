const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const SALT_I = 10
const jwt = require('jsonwebtoken')
const {Serie} = require('../server/models/Serie')
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

/*app.put('/:id',async(req,res) => {
    const updateSerie = new Serie(req.body)
    await Task.findByIdAndUpdate(req.body,updateSerie)
    res.json({succes:true})
})*/



