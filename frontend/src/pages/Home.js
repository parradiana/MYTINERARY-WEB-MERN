import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Home/Hero'
import CallToAction from '../components/Home/CallToAction'
import Footer from '../components/Footer'
import ContentCarrousel from '../components/Carrousel/ContentCarrousel';
import {TinyButton as ScrollUpButton} from "react-scroll-up-button"
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { toast } from 'react-toastify'
class Home extends React.Component {
    componentDidMount(){
        window.scroll({
            top: 0,
            left: 0
        })
        if (this.props.toastSuccess) {
            setTimeout(()=>{
                toast.success("Your Account was created successfully!")
            },1200)
        }
    }
    componentWillUnmount = () => {
        this.props.desmontarTostada()
    }
    render() {
        const contenidoCarrousel = [
            [
                { id: 1, nombre: 'Buenos Aires', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/buenosaires-scaled.jpg' },
                { id: 2, nombre: 'Rio de Janeiro', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/riodejaneiro-scaled.jpg' },
                { id: 3, nombre: 'Tokyo', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/tokyo-scaled.jpg' },
                { id: 4, nombre: 'Rome', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/rome-scaled.jpg' },
            ],
            [
                { id: 5, nombre: 'New York', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/newyork-scaled.jpg' },
                { id: 6, nombre: 'Koh Phi Phi', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/tailandia-scaled.jpg' },
                { id: 7, nombre: 'Paris', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/paris-scaled.jpg' },
                { id: 8, nombre: 'Sydney', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/sydney-scaled.jpg' },
            ],
            [
                { id: 9, nombre: 'Barcelona', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-aleksandar-pasaric-1388030-1-scaled.jpg' },
                { id: 10, nombre: 'London', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/londres2-scaled.jpg' },
                { id: 11, nombre: 'Venice', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/venecia-scaled.jpg' },
                { id: 12, nombre: 'Bariloche', imagen: 'http://baravdg.com/wp-content/uploads/2021/04/mountain-scaled.jpg' }
            ]
        ]
        return (
            <>
                <Header />
                <Hero />
                <CallToAction />
                <ContentCarrousel contenidoCarrousel={contenidoCarrousel}/>
                <ScrollUpButton style={{backgroundColor: '#ff9566', fill: 'white', paddingBottom: '3px', paddingLeft: '3px', paddingRight: '3px', borderRadius: '50%'}}/>
                <Footer />
            </>
        )
    }
}
const mapStateToProps = state => {
    return{
        toastSuccess: state.userReducer.success
    }
}
const mapDispatchToProps = {
    desmontarTostada: userActions.desmontarTostada
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
