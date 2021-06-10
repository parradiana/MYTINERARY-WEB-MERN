import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import logoopacity from '../assets/logoopacity.png'
import iconoSearch from '../assets/iconoSearch.png'
import preloader from '../assets/preloader.png'
import City from '../components/Cities/City'
import { connect } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import { Redirect } from 'react-router'
import {TinyButton as ScrollUpButton} from "react-scroll-up-button"
class Cities extends React.Component {
    componentDidMount() {
        window.scroll({
            top:0,
            left:0
        })
        this.props.cargarCities()
    }
    render() {
        if (this.props.error404) {
            return(
                <Redirect to="/error"/>
            )
        }
        if (this.props.loading) {
            return (
                <div className="preloader">
                    <img src={preloader} alt="" />
                </div>
            )
        }
        return (
            <>
                <div className="contenedorImagenCities">
                    <div className="imagenCities" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/imagencities.jpg')" }}>
                        <Header />
                        <div className="contenedorTituloDiscover">
                            <h1 className="tituloDiscover"> Discover The <span className="colorWorld">World.</span></h1>
                        </div>
                    </div>
                </div>
                <div className="contenedorInput">
                    <div className="contenedorLogoOpacity" style={{ backgroundImage: `url('${logoopacity}')` }}>
                        <h1>Find Your Adventure!</h1>
                        <input type="text" className="inputTexto" style={{ backgroundImage: `url('${iconoSearch}')` }} placeholder="Search by destination" onChange={(e)=>this.props.filtrarCities(e)} />
                    </div>
                </div>
                <div className="contenedorMapeo">
                    <div className="galleryContainer">
                        {this.props.citiesCopia.length === 0
                            ?
                            <div className="galleryItem">
                                <div className="contenedorParrafos">
                                    <p>Oops! There are not results for your search</p>
                                    <p className="parrafoColor">Try another one!</p>
                                </div>
                                <div className="imgNotResult" style={{ backgroundImage: 'url("http://baravdg.com/wp-content/uploads/2021/04/noResults.png")' }}>
                                </div>
                            </div>
                            : this.props.citiesCopia.map(ciudad => {
                                return <City key={ciudad._id} ciudad={ciudad} />
                            })
                        }
                    </div>
                </div>
                <ScrollUpButton style={{backgroundColor: '#ff9566', fill: 'white', paddingBottom: '3px', paddingLeft: '3px', paddingRight: '3px', borderRadius: '50%'}}/>
                <Footer />
            </>
        )
    }
}
const mapStateToProps = state => {
    return{
        // cities: state.citiesReducer.cities,
        citiesCopia: state.citiesReducer.citiesCopia,
        loading: state.citiesReducer.loading,
        error404: state.citiesReducer.error404
    }
}
const mapDispatchToProps = {
    cargarCities: citiesActions.fetcheoApi,
    filtrarCities: citiesActions.filtrarCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)