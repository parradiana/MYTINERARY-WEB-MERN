import { useEffect, useState } from "react"
import Footer from '../components/Footer'
import Header from '../components/Header'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import axios from 'axios'
import { FaUser, FaRegImage } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { ImKey } from 'react-icons/im'
import { BiWorld } from 'react-icons/bi'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link } from "react-router-dom"
import GoogleLogin from 'react-google-login'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = (props) => {
    const [nuevoUsuario, setNuevoUsuario] = useState({ firstname: '', lastname: '', email: '', password: '', image: '', country: '' })
    const [paises, setPaises] = useState([])
    const [oculto, setOculto] = useState(true)
    const leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        setNuevoUsuario({
            ...nuevoUsuario,
            [campo]: valor
        })
    }
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setPaises(response.data))
    }, [])
    const toastSuccess = () => {
        props.toastSuccess()
        props.history.push('/')
    }
    const enviarFormulario = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let usuario = e ? nuevoUsuario : googleUser
        if (Object.values(usuario).some(value => value === "")) {
            toast.error("All the fields are required!")
        } else {
            const response = await props.agregarUsuario(usuario)
            if (response) {
                if (response.details) {
                    response.details.map(error => toast.error(error.message, {autoClose : 7000}))
                } else {
                    toast.error(response)
                }
            } else {
                toastSuccess()
                setNuevoUsuario({ firstname: '', lastname: '', email: '', password: '', image: '', country: '' }) 
            }
        }
    }    
    const responseGoogle = (response) => {
        const { givenName, email, googleId, imageUrl, familyName } = response.profileObj
        enviarFormulario(null, { firstname: givenName, lastname: familyName, email: email, password: "ROMEjuli" + googleId, image: imageUrl, country: 'Argentina' })
    }
    return (
        <>
            <div className="imageSignUpLogIn" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/imagenformulario-1.jpg')" }}>
                <Header />
                <div className="contenedorLogo">
                    <h2>Create Account!</h2>
                    <p className="fraseForm">Please fill the details to Sign Up!</p>
                </div>
                <div className="contenedorformularios">
                    <form className="formularios">
                        <span className="contenedorinput" ><FaUser className="inputIcons" /><input type="text" value={nuevoUsuario.firstname} name="firstname" placeholder="Firtsname" onChange={leerInput} autoComplete="off" /></span>
                        <span className="contenedorinput"><FaUser className="inputIcons" /><input type="text" value={nuevoUsuario.lastname} name="lastname" placeholder="Last name" onChange={leerInput} autoComplete="off" /></span>
                        <span className="contenedorinput" ><HiMail className="inputIcons" /><input type="email" value={nuevoUsuario.email} name="email" placeholder="Email" onChange={leerInput} autoComplete="off" /></span>
                        <span className="contenedorinput"><ImKey className="inputIcons" /><input type={oculto ? "password" : "text"} value={nuevoUsuario.password} name="password" placeholder="Password" onChange={leerInput} autoComplete="off" />
                            <div onClick={() => setOculto(!oculto)} className="divEye">
                                {oculto ? <BsEyeSlash className="inputIcons" /> : <BsEye className="inputIcons" />}
                            </div>
                        </span>
                        <span className="contenedorinput"><FaRegImage className="inputIcons" /><input type="text" value={nuevoUsuario.image} name="image" placeholder="URL of your picture" onChange={leerInput} autoComplete="off" /></span>
                        <span className="contenedorinput" ><BiWorld className="inputIcons" />
                            <select value={nuevoUsuario.country} name="country" placeholder="Choose your country" onChange={leerInput} >
                                <option defaultValue>Choose your country</option>
                                {paises.map(pais => <option key={pais.name} value={pais.name}>{pais.name}</option>)}
                            </select>
                        </span>
                        <div className="contenedorBotonForm">
                            <div className="buttonGoogle">
                                <button onClick={enviarFormulario} className="botonForm">Sign Up</button>
                                Or
                                <GoogleLogin
                                    clientId="1037182337152-gabq60m290ncgbpigfh4ppodrri0jsdh.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="bGoogle"><FcGoogle /> Sign Up with Google</button>
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <p>Already have an account? <Link to="/login" className="linkLogIn">Log In here!</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapDispatchToProps = {
    agregarUsuario: userActions.agregarUsuario,
    toastSuccess: userActions.toastSuccess
}
export default connect(null, mapDispatchToProps)(SignUp)