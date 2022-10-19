const express = require('express');
const cors = require('cors');
const router = require('./routes/user');
const { dbConnection } = require('./db/config');
const app = express()
require('dotenv').config();

dbConnection()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())


app.use('/api/usuario', router)




app.listen( process.env.PORT, ()  => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`)
})