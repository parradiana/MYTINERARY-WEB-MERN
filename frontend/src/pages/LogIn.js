import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { HiMail } from 'react-icons/hi'
import { ImKey } from 'react-icons/im'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import GoogleLogin from 'react-google-login'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LogIn = (props) => {
    const [logInUsuario, setLogInUsuario] = useState({ email: '', password: '' })
    const [oculto, setOculto] = useState(true)
    const leerInput = e => {
        const campo = e.target.name
        const valor = e.target.value
        setLogInUsuario({
            ...logInUsuario,
            [campo]: valor
        })
    }
    const enviarFormulario = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let usuario = e ? logInUsuario : googleUser
        if (usuario.email === '' || usuario.password === '') {
            toast.error("All the fields must be filled")
        } else {
            const response = await props.loguearUsuario(usuario)
            response ? toast.error(response) : toast.success("Welcome to MYtinerary!", { onClose: () => props.history.push('/'), autoClose : 1500  })
            setLogInUsuario({ email: '', password: '' })
        }
    }
    const responseGoogle = (response) => {
        const { email, googleId } = response.profileObj
        enviarFormulario(null, { email: email, password: "ROMEjuli" + googleId })
    }
    return (
        <>
            <div className="imageSignUpLogIn" style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/imagenformulario-1.jpg')" }}>
                <Header />
                <div className="contenedorInfoLogIn">
                    <div className="contenedorLogo">
                        <h2>Welcome back!</h2>
                        <p className="fraseFormLogIn">Log in to discover and connect with MYtinerary's global community</p>
                    </div>
                    <div className="contenedorformularioLogIn">
                        <form className="formularios">
                            <span className="contenedorinput"><HiMail className="inputIcons" /> <input type="email" className="input" value={logInUsuario.email} name="email" placeholder="Email" onChange={leerInput} autoComplete="off" /></span>
                            <span className="contenedorinput"><ImKey className="inputIcons" /> <input type={oculto ? "password" : "text"} className="input" value={logInUsuario.password} name="password" placeholder="Password" onChange={leerInput} autoComplete="off" /> 
                                <div onClick={() => setOculto(!oculto)} className="divEye">
                                    {oculto ? <BsEyeSlash className="inputIcons" /> : <BsEye className="inputIcons" />}
                                </div>
                            </span>
                            <div className="contenedorBotonForm">
                                <div className="buttonGoogle">
                                    <button className="botonForm" onClick={enviarFormulario}>Log In</button>
                                Or
                                <GoogleLogin
                                        clientId="1037182337152-gabq60m290ncgbpigfh4ppodrri0jsdh.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="bGoogle"><FcGoogle /> Log In with Google</button>
                                        )}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <p>Don't have an account? <Link to="/signup" className="linkLogIn">Sign up here! </Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapDispatchToProps = {
    loguearUsuario: userActions.loguearUsuario
}
export default connect(null, mapDispatchToProps)(LogIn)