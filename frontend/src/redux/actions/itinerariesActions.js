import axios from "axios"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const itinerariesActions = {
    cargarItinerarios: (id) => {
        return (dispatch, getState) => {
            axios.get('http://localhost:4000/api/itineraries/' + id)
                .then(response => dispatch({ type: 'CARGAR_ITINERARIOS', payload: response.data.respuesta }))
                .catch(error => console.log(error))
        }
    },
    reseteoItineraries: () => {
        return (dispatch, getState) => {
            dispatch({ type: 'RESETEO_ITINERARIOS', payload: [] })
        }
    },
    cargarActividades: (id) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/activities/' + id)
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                toast.error("Oops! Something went wrong")
            }
        }
    },
    cargarComentario: (inputcomment, id) => {
        // console.log()
        var comment = inputcomment.comment
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/comments/' + id, { comment }, {
                    headers: {
                        'Authorization': 'Bearer ' + inputcomment.token
                    }
                })
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                toast.error("Oops! Something went wrong")
            }
        }
    },
    editarComentario: (idItinerary, comment, idComment) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/comments/'+idItinerary, {comment, idComment})
                return response.data.respuesta.comments
            } catch (error) {
                console.log(error)
                toast.error("Oops! Something went wrong")
            }
        }
    },
    borrarComentario: (idItinerary, idComment) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('http://localhost:4000/api/comments/'+idItinerary, {
                    data:{
                        idComment: idComment
                    }
                })
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                toast.error("Oops! Something went wrong")
            }
        }
    },
    like: (token, idItinerary) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/like/', {idItinerary},{
                    headers:{
                        'Authorization': 'Bearer ' +token 
                    }
                })
                return response.data.respuesta
            } catch (error) {
                console.log(error)
                toast.error("Oops! Something went wrong")
            }
        }
    }
}
export default itinerariesActions