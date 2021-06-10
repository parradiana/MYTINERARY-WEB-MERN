const mongoose = require('mongoose')
const citySchema = new mongoose.Schema({
    nombreCiudad: {type: String, required: true},
    pais: {type: String, required: true},
    imagen:{type: String, required: true},
    bandera:{type: String, required: true},
    descripcion:{type: String, required: true},
    moneda:{type: String, required:true},
    idioma:{type: String, required:true}
})
const City = mongoose.model('city', citySchema)
module.exports = City