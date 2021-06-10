const Activity = require('../models/Activity')
const activitiesControllers = {
    obtenerTodasActividades: async(req, res) => {
        try {
            const todasActividades = await Activity.find()
            res.json({respuesta: todasActividades, success: true})
        } catch (error) {
            res.json({respuesta: 'Ha ocurrido un error en el servidor', success: false})
        }
    },
    cargarActividad: async(req, res) => {
        try {
           const {activities, idItinerary} = req.body
           const agregarActividad = new Activity({
            activities,
            idItinerary
           })
           await agregarActividad.save()
           const todasActividades = await Activity.find()
           res.json({respuesta: todasActividades, success:true})
        } catch (error) {
            res.json({respuesta: 'Ha ocurrido un error en el servidor', success:false})
        }
    },
    obtenerActividadesPorItinerario: async(req, res) => {
        const id = req.params.id
        try {
            const actividadesPorItinerario = await Activity.findOne({idItinerary: id})
            await res.json({respuesta: actividadesPorItinerario, success: true})
        } catch (error) {
            res.json({respuesta: 'Ha ocurrido un error en el servidor', success:false})
        }
    }
}
module.exports = activitiesControllers