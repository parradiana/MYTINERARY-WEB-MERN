import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const userActions = {
    agregarUsuario: (nuevoUsuario) => {
        console.log(nuevoUsuario)
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/user/signup', nuevoUsuario)
                if (!response.data.success) {
                    return response.data.errors || response.data.error
                }
                dispatch({type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null})
            } catch (error) {
                console.log(error)
                toast.error("Oops! Something went wrong!")
            }
        }   
    },
    loguearUsuario: (logInUsuario) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/user/login', logInUsuario)
                if (!response.data.success) {
                    return response.data.error
                }
                dispatch({type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null})
            } catch (error) {
                console.log(error)
                toast.error("Oops! Something went wrong!")
            } 
        }
    },
    desloguearUsuario: () => {
        return (dispatch, getState) => {
            dispatch({type: 'DESLOGUEAR_USUARIO'})
            toast.info("Hope to see you soon!")
        }
    },
    logueoLocalStorage: (usuarioLocalStorage) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/user/logueolocalstorage', {
                    headers: {
                        'Authorization': 'Bearer ' + usuarioLocalStorage.token
                    }
                })
                dispatch({type: 'LOGUEAR_USUARIO', payload: {...response.data.respuesta, token:usuarioLocalStorage.token}})
            } catch (error) {
                if (error.response.status === 401) {
                    toast.error("Oops! Something went wrong! You are not authorized to enter this page")
                }
            }
        }
    },
    toastSuccess: () => {
        return (dispatch, getState) => {
            dispatch({type: 'SUCCESS', payload: true})
        }
    },
    desmontarTostada:() => {
        return (dispatch, getState) => {
            dispatch({type: 'SUCCESS', payload: false})
        }
    }
}
export default userActions