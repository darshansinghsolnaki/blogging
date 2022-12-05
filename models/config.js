const mongoose = require('mongoose')

mongoose.connect( process.env.URL, {useNewUrlParser : true})
const connection = mongoose.connection
connection.once("open", (req, res) => {
    console.log('Mongodb Connection Succesfull');
})
