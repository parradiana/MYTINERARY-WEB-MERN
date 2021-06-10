import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link} from 'react-router-dom'
import logoIdiomas from '../assets/idiomas.png'
import monedas from '../assets/monedas.png'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import Itinerary from '../components/Itineraries/Itinerary'
import itinerariosNotFound from '../assets/itinerariosNotFound.png'
import avionItineraries from '../assets/avionItineraries.png'
import {TinyButton as ScrollUpButton} from "react-scroll-up-button"

class Itineraries extends React.Component {
    state = {
        city: [],
    }
    componentDidMount() {
        window.scroll({
            top: 0,
            left: 0
        })
        if (this.props.cities.length === 0) {
            this.props.history.push('/cities')
        } else{
            this.setState({
                city: this.props.cities.find(ciudad => ciudad._id === this.props.match.params.id),
            })
        }
        this.props.cargarItinerarios(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.reseteoItineraries()
    }
    render() {
        return (
            <>
                <div className="imagenItineraries" style={{ backgroundImage: `url('${this.state.city.imagen}')` }}>
                    <Header className="headerItineraries" />
                    <div className="tituloItineraries">
                        <h1>Welcome to <span className="colorTitulo">{this.state.city.nombreCiudad}</span></h1>
                    </div>
                </div>
                <div className="cajaGrandeAgregados">
                    <div className="contenedorAgregados">
                        <div className="contenedorMonedas">
                            <div className="imagenMonedas" style={{ backgroundImage: `url('${monedas}')` }}></div>
                            <div className="monedas">{this.state.city.moneda}</div>
                        </div>
                        <div className="contenedorBanderaPais">
                            <div className="bandera" style={{ backgroundImage: `url('${this.state.city.bandera}')` }}></div>
                            <div className="pais">{this.state.city.pais}</div>
                        </div>
                        <div className="contenedorIdiomas">
                            <div className="imagenIdiomas" style={{ backgroundImage: `url('${logoIdiomas}')` }}></div>
                            <div className="idiomas">{this.state.city.idioma}</div>
                        </div>
                    </div>
                </div>
                <div className="contenedorHeroItinerarios">
                    <div className="avionItineraries" style={{ backgroundImage: `url('${avionItineraries}')` }}></div>
                    <h1>Find the best Itinerary for your next trip!</h1>
                </div>
                <div className="contenedorItinerarios">
                    {this.props.itineraries.length === 0
                        ? <div className="contenedorItinerariosNotFound">
                            <div className="itinerariosNotFound" style={{ backgroundImage: `url('${itinerariosNotFound}')` }}></div>
                            <h2 className="fraseItinerariosNotFound">Oh! It seems that there are not itineraries for this city yet!</h2>
                            <p className="fraseItinerariosNotFound">Please, feel free to post the first one!</p>
                        </div>
                        : this.props.itineraries.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary} cityName={this.state.city.nombreCiudad}/>)
                    }
                </div>
                <div className="contenedorBotones">
                    <Link className="botonA" to="/cities"><button className="botonRegreso">Go Back To Cities!</button></Link>
                    <Link className="botonA" to="/"><button className="botonRegreso">Go Back To Home!</button></Link>
                </div>
                <ScrollUpButton style={{backgroundColor: '#ff9566', fill: 'white', paddingBottom: '3px', paddingLeft: '3px', paddingRight: '3px', borderRadius: '50%'}}/>
                <Footer />
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        cities: state.citiesReducer.cities,
        itineraries: state.itinerariesReducer.itineraries,
    }
}
const mapDispatchToProps = {
    cargarItinerarios: itinerariesActions.cargarItinerarios,
    reseteoItineraries: itinerariesActions.reseteoItineraries,
}
export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)