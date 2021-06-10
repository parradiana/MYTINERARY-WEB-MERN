const City = require('../models/City')
const citiesControllers = {
    todasLasCiudades: async (req, res) => {
        try {
            const todasCities = await City.find()
            res.json({ respuesta: todasCities, success: true}) 
        } catch (error) {
            res.json({success: false, respuesta: 'Ha ocurrido un error en el servidor'})
        }
    },
    agregarCiudad: async (req, res) => {
        try {
            const { nombreCiudad, pais, imagen, descripcion, bandera, moneda, idioma } = req.body
            const agregarCity = new City({
                nombreCiudad,
                pais,
                imagen,
                descripcion,
                bandera,
                moneda,
                idioma
            })
            await agregarCity.save()
            const todasCities = await City.find()
            res.json({ success: true, respuesta: todasCities })
        } catch (error) {
            res.json({success: false, respuesta: 'Ha ocurrido un error en el servidor'})
        }
    },
    obtenerSoloUnaCiudad: async (req, res) => {
        const id = req.params.id
        console.log(id)
        try {
            const buscarCiudad = await City.findOne({_id: id})         
            await res.json({respuesta:buscarCiudad, success:true})   
        } catch (error) {
            res.json({success: false, respuesta: 'Ha ocurrido un error en el servidor'})
        }
    },
    modificarCiudad: async (req, res) => {
        const id = req.params.id
        try {
            const modificarCity = await City.findOneAndUpdate({_id: id}, {...req.body}, {new: true})
            res.json({success: true, respuesta: modificarCity})  
        } catch (error) {
            res.json({success: false, respuesta: 'Ha ocurrido un error en el servidor'}) 
        }
    },
    borrarCiudad: async (req, res) => {
        const id = req.params.id
        try {
            const borrarCity = await City.findOneAndDelete({_id: id})
            res.json({success: true, respuesta: borrarCity}) 
        } catch(error) {
            res.json({success: false, respuesta: 'Ha ocurrido un error en el servidor'})
        }
    },
}
module.exports = citiesControllers
