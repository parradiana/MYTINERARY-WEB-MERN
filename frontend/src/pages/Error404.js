import React from 'react'
import { Link } from 'react-router-dom'
import error404 from '../assets/404Error.png'
class Error404 extends React.Component {
    render() {
        return (
            <>
                <div className="contenedorNotFound">
                    <h1 className="h1404">Error 404 page not found</h1>
                    <div className="imagen404" style={{backgroundImage: `url('${error404}')`}}></div>
                    <p className="pNotFound">We're sorry, the page you requested could not be found.</p>
                    <p className="pNotFound">Please go back to de homepage!</p>
                    <Link to="/" className="botonA"><button className="botonRegresoError">Go Back To Home!</button></Link>
                </div>
            </>
        )
    }
}
export default Error404