const initialState = {
    cities: [],
    citiesCopia: [],
    loading: true,
    error404: false
}
const citiesReducer = (state=initialState, action) =>{
    switch (action.type) {
        case 'FETCHEO_API':
            return{
                ...state,
                cities: action.payload,
                citiesCopia: action.payload,
                loading: false   
            }
            break;
        case 'FILTRAR_CITIES':
            return{
                ...state,
               citiesCopia: state.cities.filter(ciudad => ciudad.nombreCiudad.toLowerCase().indexOf(action.payload.trim().toLowerCase()) === 0) 
            }
            break;
        case 'ERROR_404':
            return{
                error404: action.payload  
            }
        break;          
        default:
            return state
    }
}


export default citiesReducer