require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const app = express()
const router = require('./routes/index')
require('./config/database')
require('./config/passport')


app.use(cors())
app.use(express.json())
 
app.use('/api', router)

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT


app.listen(port, host, () => console.log("App listening on port"+port+ " on "+host))