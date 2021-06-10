const initialState = {
    usuarioLogueado: null,
    // success: false
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGUEAR_USUARIO':
            localStorage.setItem('usuarioLogueado', JSON.stringify({firstname: action.payload.firstname,
                image: action.payload.image, email: action.payload.email, lastname:action.payload.lastname}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                usuarioLogueado: action.payload
            }
        case 'DESLOGUEAR_USUARIO':
            localStorage.clear()
            return {
                ...state,
                usuarioLogueado: null
            }
        // case 'SUCCESS':
        //     return{
        //         success: action.payload
        //     }
        default:
            return state

    }
}
export default userReducer