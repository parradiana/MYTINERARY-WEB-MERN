import logo from '../../assets/logooriginal.png'
import { Link } from 'react-router-dom'
import Video from '../../assets/MYtinerary.mp4'

const Hero = () => {
    return (
        <div className="contenedorHero">
            <video autoPlay loop muted>
                <source src={Video} type="video/mp4"></source>
            </video>
            <div className="contenedorSlogan">
                <div className="titulo">
                    <img className="logo" src={logo} alt="logo"></img>
                    <h1>MYtinerary</h1>
                </div>
                <div className="frase">
                    <p>Find your perfect trip, designed by insiders who know and love their cities!</p>
                </div>
                <div className="contenedorBoton">
                    <p>Choose your destination</p>
                    <Link className="botonA" to="/cities"><button className="botonCallToAction">CLICK HERE!</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Hero