const Itinerary = require('../models/Itinerary')
const itinerariesControllers = {
    obtenerItinerarios: async (req, res) => {
        try {
            const todosItinerarios = await Itinerary.find()
            res.json({ respuesta: todosItinerarios, success: true })
        } catch (error) {
            res.json({ success: false, respuesta: 'Ha ocurrido un error en el servidor' })
        }
    },
    cargarItinerario: async (req, res) => {
        try {
            const { itineraryImage, tittle, authorName, authorImage, description, price, duration, hashtags, likes, idCity } = req.body
            const agregarItinerario = new Itinerary({
                itineraryImage,
                tittle,
                authorName,
                authorImage,
                description,
                price,
                duration,
                hashtags,
                likes,
                idCity,
            })
            await agregarItinerario.save()
            const todosItinerarios = await Itinerary.find()
            res.json({ success: true, respuesta: todosItinerarios })
        } catch (error) {
            res.json({ success: false, respuesta: 'Ha ocurrido un error en el servidor' })
        }
    },
    obtenerItinerarioIndividual: async (req, res) => {
        const id = req.params.id
        try {
            const buscarItinerario = await Itinerary.findOne({ _id: id }).populate('idCity')
            await res.json({ respuesta: buscarItinerario, success: true })
        } catch (error) {
            res.json({ success: false, respuesta: 'Ha ocurrido un error en el servidor' })
        }
    },
    obtenerItinerariosPorCiudad: async (req, res) => {
        const id = req.params.id
        try {
            const itinerariosPorCiudad = await Itinerary.find({ idCity: id }).populate({
                path: "comments", populate: {
                    path: "userId", select: {
                        "firstname": 1, "lastname": 1, "image": 1, "email":1
                    }
                }
            })
            await res.json({ success: true, respuesta: itinerariosPorCiudad })
        } catch (error) {
            res.json({ success: false, respuesta: 'Ha ocurrido un error en el servidor' })
        }

    },
    modificarItinerario: async (req, res) => {
        const id = req.params.id
        try {
            const modificarItinerario = await Itinerary.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
            res.json({ success: true, respuesta: modificarItinerario })
        } catch (error) {
            res.json({ success: false, respuesta: 'Ha ocurrido un error en el servidor' })
        }
    },
    borrarItinerario: async (req, res) => {
        const id = req.params.id
        try {
            const borrarItinerario = await Itinerary.findOneAndDelete({ _id: id })
            res.json({ success: true, respuesta: borrarItinerario })
        } catch (error) {
            res.json({ success: false, respuesta: 'Ha ocurrido un error en el servidor' })
        }
    },
    like: async (req, res) => {
        const userEmail = req.user.email
        const idItinerario = req.body.idItinerary
        try {
            const itinerary = await Itinerary.findOne({_id: idItinerario, "userLiked": userEmail})
            if (!itinerary) {
                const likearItinerario = await Itinerary.findOneAndUpdate({_id: idItinerario}, {$push: {userLiked: userEmail}}, {new:true})
                res.json({success: false, respuesta: {userLiked:likearItinerario.userLiked, heart: true}})
            } else{
                const deslikearItinerario = await Itinerary.findOneAndUpdate({_id:idItinerario}, {$pull: {userLiked: userEmail}}, {new:true})
                res.json({success: true, respuesta: {userLiked: deslikearItinerario.userLiked, heart: false}})
            }
        } catch (error) {
            res.json({ success: false, respuesta: 'Ha ocurrido un error en el servidor' })
        }
    }
}
module.exports = itinerariesControllers