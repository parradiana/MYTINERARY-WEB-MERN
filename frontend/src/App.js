import React from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Cities from './pages/Cities'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Error404 from './pages/Error404'
import 'bootstrap/dist/css/bootstrap.min.css';
import Itineraries from './pages/Itineraries'
import { connect } from 'react-redux'
import userActions from './redux/actions/userActions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
class App extends React.Component {
  render() {
    if (!this.props.usuarioLogueado && localStorage.getItem('token')) {
      const objetoUsuario = JSON.parse(localStorage.getItem('usuarioLogueado'))
      const usuarioLocalStorage = {
        ...objetoUsuario,
        token: localStorage.getItem('token')
      }
      this.props.logueoLocalStorage(usuarioLocalStorage)
    }
    return (
      <>
      <ToastContainer/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cities" component={Cities} />
          <Route path="/itineraries/:id" component={Itineraries} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/error" component={Error404} />
          <Redirect to="/error" />
        </Switch>
      </BrowserRouter>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    usuarioLogueado: state.userReducer.usuarioLogueado
  }
}
const mapDispatchToProps = {
  logueoLocalStorage: userActions.logueoLocalStorage
}
export default connect(mapStateToProps, mapDispatchToProps)(App)