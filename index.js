require('dotenv').config()
const express = require('express')
const app = express()
require('./models/config')
const bodyparser = require('body-parser')
const router = require('./routers/manRouter')

app.use(express.json())
app.use(bodyparser.json())

app.use('/', router)

app.listen(process.env.PORT,() => {
    console.log(`Server is Running : ${process.env.PORT}`);
})
