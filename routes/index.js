const express = require('express')
const router = express.Router()
const validator = require('../config/validator')
const passport = require('passport')
const citiesControllers = require('../controllers/citiesControllers')
const {todasLasCiudades, obtenerSoloUnaCiudad, agregarCiudad, modificarCiudad, borrarCiudad} = citiesControllers
const itinerariesControllers = require('../controllers/itinerariesControllers')
const {obtenerItinerarios, cargarItinerario,obtenerItinerarioIndividual,obtenerItinerariosPorCiudad,modificarItinerario,borrarItinerario, like} = itinerariesControllers
const userControllers = require('../controllers/userControllers')
const {cargarUsuario, logueoUsuario, logueoLocalStorage} = userControllers
const activitiesControllers = require('../controllers/activitiesControllers')
const {obtenerTodasActividades, cargarActividad, obtenerActividadesPorItinerario} = activitiesControllers
const commentsControllers = require('../controllers/commentsControllers')
const {cargarComentario, editarComentario, borrarComentario} = commentsControllers


router.route('/cities')
.get(todasLasCiudades)
.post(agregarCiudad)
router.route('/city/:id')
.get(obtenerSoloUnaCiudad)
.put(modificarCiudad)
.delete(borrarCiudad)

router.route('/itineraries')
.get(obtenerItinerarios)
.post(cargarItinerario)
router.route('/itinerary/:id')
.get(obtenerItinerarioIndividual)
.put(modificarItinerario)
.delete(borrarItinerario)
router.route('/itineraries/:id')
.get(obtenerItinerariosPorCiudad)

router.route('/user/signup')
.post(validator, cargarUsuario)
router.route('/user/login')
.post(logueoUsuario)
router.route('/user/logueolocalstorage')
.get(passport.authenticate('jwt', {session: false}), logueoLocalStorage)

router.route('/activities')
.get(obtenerTodasActividades)
.post(cargarActividad)
router.route('/activities/:id')
.get(obtenerActividadesPorItinerario)

router.route('/comments/:id')
.post(passport.authenticate('jwt', {session: false}), cargarComentario)
.put(editarComentario)
.delete(borrarComentario)

router.route("/like/")
.put(passport.authenticate('jwt', {session: false}), like)
module.exports = router


