import { Link } from "react-router-dom"

const City = ({ ciudad }) => {
    return (
        <Link to={`/itineraries/${ciudad._id}`} className="galleryItem">
            <div className="galleryImg" style={{ backgroundImage: `url('${ciudad.imagen}')` }}>
                <div className="info">
                    <div className="infoContainer">
                        <div className="nombreCiudad">{ciudad.nombreCiudad}</div>
                        <div className="descripcionCiudad">{ciudad.descripcion}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default City