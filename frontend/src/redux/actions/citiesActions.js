import axios from "axios"

const citiesActions = {
    fetcheoApi: () => {
        return(dispatch, getState) => {
            axios.get('http://localhost:4000/api/cities')
            .then(response => dispatch({type: 'FETCHEO_API', payload: response.data.respuesta}))
            .catch(error => dispatch({type: 'ERROR_404', payload: true}))
        }
    },
    filtrarCities: (e) => {
        const valor = e.target.value
        return(dispatch, getState) => {
            dispatch({type:'FILTRAR_CITIES', payload:valor})
        }
    }
}
export default citiesActions