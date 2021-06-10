import { NavLink, Link } from 'react-router-dom'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import LogoUsuario from '../assets/logousuario.png'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
const Header = (props) => {
    const usuario = props.usuarioLogueado && props.usuarioLogueado.firstname
    const usuarioImage = props.usuarioLogueado ? props.usuarioLogueado.image : LogoUsuario
    return (
        <header className="contenedorHeader">
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="barraNav" id="basic-navbar-nav">
                    <Nav className="mr-auto contenedorNav">
                        <NavLink exact to="/" className="navegadores">Home</NavLink>
                        <NavLink to="/cities" className="navegadores">Cities</NavLink>
                        {!props.usuarioLogueado && (
                            <>
                                <Link to="/signup" className="navegadores">Sign Up</Link>
                                <Link to="/login" className="navegadores">Log In</Link>
                            </>
                        )}
                        {props.usuarioLogueado && (
                            <Link to="/"><span onClick={props.desloguearUsuario} className="navegadores">Log Out</span></Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="mensajeWelcome">
                {props.usuarioLogueado && <p>Welcome {usuario}!</p>}
                <div>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <div className="logoUsuario" style={{ backgroundImage: `url('${usuarioImage}')` }}></div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <div className="ventanaUserInfo">
                                <div className="logoUsuarioVentana" style={{ backgroundImage: `url('${usuarioImage}')` }}></div>
                                {!props.usuarioLogueado
                                    ? <p>You have not logged in or registered!</p>
                                    : <p>{usuario} {props.usuarioLogueado && props.usuarioLogueado.lastname}</p>
                                }
                                <small>{props.usuarioLogueado && props.usuarioLogueado.email}</small>
                                {props.usuarioLogueado ? (
                                    <Link to="/"><span onClick={props.desloguearUsuario} className="logOutVentana">Log Out</span></Link>
                                )
                                    : (
                                        <div className="contenedorLinksLogueado">
                                            <Link to="/signup"><span className="linksVentana">Sign Up</span></Link>
                                            <Link to="/login"><span className="linksVentana">Log In</span></Link>
                                        </div>
                                    )}
                            </div>
                        </Dropdown.Menu>
                     </Dropdown>
                </div>
            </div>
        </header>
    )
}
const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    desloguearUsuario: userActions.desloguearUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)