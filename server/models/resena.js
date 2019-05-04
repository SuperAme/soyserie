const mongoose = require ('mongoose')

const resenaSchema = mongoose.Schema({ 
    idresena: { required: true, 
        type: String
    },
    name: { required: true, 
        type: String,
        unique: 1, 
        maxlength: 100
    },
    content: { required: true,
        type: String,
        maxlength: 250
    },

    rating: {
        required: true,
        type: Number,
        maxlength: 1

    },
    efectos: {
        required: true,
        type: Number,
        maxlength: 1
    },
    musica:{
        required: true,
        type: Number,
        maxlength: 1
    },
    general: {
        required: true,
        type: Number,
        maxlength: 1
    }
    
    
    }) 

const Resena = mongoose.model('Resena', resenaSchema, 'resenas') 



module.exports = { Resena }