const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userControllers = {
    cargarUsuario: async (req, res) => {
        var {image, firstname, lastname, password, email, country} = req.body
        const mailEnUso = await User.findOne({email})
        var respuesta
        var error
        var grabarUsuario
        password = bcryptjs.hashSync(password, 10)
        if (!mailEnUso) {
            try {
                grabarUsuario = new User({
                    image,
                    firstname,
                    lastname,
                    password,
                    email,
                    country,
                })
                await grabarUsuario.save()
                const token = jwt.sign({...grabarUsuario}, process.env.SECRET_OR_KEY)
                respuesta = token
            } catch {
                error = "User data loading error"
            }
        } else {
            error = "An account already exists with this email"
        }
        res.json({
            success: !error ? true : false,
            respuesta: !error && {token: respuesta, image: grabarUsuario.image, firstname: grabarUsuario.firstname, lastname: grabarUsuario.lastname , email: grabarUsuario.email},
            error: error
        })
    },
    logueoUsuario: async (req, res) => {
        var {email, password} = req.body
        var respuesta
        var error
        var usuarioLogueado
        usuarioLogueado = await User.findOne({email})
        if (usuarioLogueado) {
            const passwordCompare = bcryptjs.compareSync(password, usuarioLogueado.password)
            if (passwordCompare) {
                const token = jwt.sign({...usuarioLogueado}, process.env.SECRET_OR_KEY)
                respuesta = token
            }else{
                error = "Incorrect username or password "
            }
        } else {
            error = "Incorrect username or password "
        }
        res.json({
            success: !error ? true : false,
            respuesta: !error && {token: respuesta, image: usuarioLogueado.image, firstname: usuarioLogueado.firstname, lastname:usuarioLogueado.lastname , email:usuarioLogueado.email},
            error: error
        })
    },
    logueoLocalStorage: async (req, res) => {
        res.json({success: true, respuesta: {image: req.user.image, firstname: req.user.firstname, lastname: req.user.lastname , email:req.user.email}})
    } 
}
module.exports = userControllers