const Itinerary = require('../models/Itinerary')

const commentsControllers = {
    cargarComentario: async (req, res) => {
        const idItinerario = req.params.id
        const userId = req.user._id
        const comment = req.body.comment
        try {
            const agregarComentario = await Itinerary.findOneAndUpdate({ _id: idItinerario },
                { $push: { comments: { comment: comment, userId: userId} } }, { new: true }).populate({
                    path: "comments", populate: {
                        path: "userId", select: {
                            "firstname": 1, "lastname": 1, "image": 1, "email":1
                        }
                    }
                })
            res.json({ respuesta: agregarComentario, success: true })
        } catch (error) {
            res.json({ respuesta: 'Ha ocurrido un error en el servidor', success: false })
        }
    },
    editarComentario: async (req, res) => {
        const idItinerario = req.params.id
        const comment = req.body.comment
        const idComment = req.body.idComment
        try {
            const editarComentario = await Itinerary.findOneAndUpdate({ _id: idItinerario, "comments._id": idComment },
                { $set: { "comments.$.comment": comment} }, { new: true })
                .populate({ path:"comments", populate:{ path:"userId", select:{ "firstname":1 ,"lastname":1,"image":1, "email":1 } } })
                res.json({ respuesta: editarComentario, success: true })
        } catch (error) {
            res.json({ respuesta: 'Ha ocurrido un error en el servidor', success: false })
        }
    },
    borrarComentario: async (req, res) => {
        const idItinerario = req.params.id
        const idComment = req.body.idComment
        try {
            const borrarComentario = await Itinerary.findOneAndUpdate({ _id: idItinerario, "comments._id": idComment},
                {$pull: {comments: {_id: idComment}}}, { new: true })
                .populate({ path:"comments", populate:{ path:"userId", select:{ "firstname":1 ,"lastname":1,"image":1, "email":1} } })
            res.json({ respuesta: borrarComentario, success: true })
        } catch (error) {
            res.json({ respuesta: 'Ha ocurrido un error en el servidor', success: false })
        }
    }
}
module.exports = commentsControllers