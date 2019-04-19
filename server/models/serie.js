const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const brandSchema = mongoose.Schema({
    titulo:{
        required: true,
        type: String,
        maxlength: 1000
    },
    plataforma:{
        type: String,
        maxlength: 1000
    },
    temporadas:{
        required:true,
        type: Number
    },
    año:{
        required: true,
        type: Date
    },
    genero:{
        required: true,
        type: String
    },
    cast:{
        type: String
    }

})




const Serie = mongoose.model('Serie', brandSchema)
module.exports = { Serie }