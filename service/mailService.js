const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user :  "rinkesh270698@gmail.com",
        pass : "vnelxggsxxgagbxo"
    }
})

module.exports = { transporter }