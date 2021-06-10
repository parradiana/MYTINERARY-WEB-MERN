import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import imgfooter from '../assets/footer.png'
const Footer = () => {
    return (
        <footer>
            <div className="imgFooter" style={{ backgroundImage: `url('${imgfooter}')` }}>
                <div className="contenedorFooter">
                    <div className="redesSociales">
                        <i className="bi bi-instagram text-light iconos"></i>
                        <i className="bi bi-facebook text-light iconos"></i>
                        <i className="bi bi-envelope text-light iconos"></i>
                    </div>
                    <div className="contenedorNav">
                        <NavLink to="/" className="navFooter">Home</NavLink>
                        <NavLink to="/cities" className="navFooter">Cities</NavLink>
                        <Link to="/" className="navFooter">Sign Up</Link>
                        <Link to="/" className="navFooter">Log In</Link>
                    </div>
                </div>
                <div className="AllRightsReserved">
                    <p>MYtinerary Proyect 2021 - All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer