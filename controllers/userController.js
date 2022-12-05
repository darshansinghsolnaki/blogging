const user_schema = require('../models/user_Schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { transporter } = require('../service/mailService')

const signUp = async (req, res) => {
    const { email, password } = req.body
    const userData = new user_schema(req.body)
    try {
        if (userData != null) {
            const userExist = await user_schema.findOne({ email: email })
            if (userExist != null) {
                res.status(403).json({
                    status : 403,
                    message : "User alredy Exists"
                })
            }
        }
        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(password, salt)
        const filepath = `/uploads${req.file.filename}`
        userData.profile_Pic = filepath
        const addRes = await userData.save();
        return res.status(200).json({
            status : 200,
            message : "User Created Succesfully"
        })
    } catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
        })

    }
}


const logIn = async (req, res) => {
    const userCheck = new user_schema(req.body)
    try {
        if (userCheck != null) {
            const exists = await user_schema.findOne({ email: userCheck.email })
            //exists database se check kare ge 
            if (exists != null) {
                const isMatch = await bcrypt.compare(userCheck.password, exists.password)
                if (userCheck.email === exists.email && isMatch) {
                    const token = jwt.sign({ userID: exists._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
                    const userShow = await user_schema.find({ email: userCheck.email }).select('-password')
                    return res.status(200).json({
                        status : 200,
                        message : "User Login Successfull",
                        "token" : token,
                    })
                } else {
                    return res.status(401).json({
                        status : 401,
                        message : "User password is not correct"
                    })
                }
            } else {
                return res.status(401).json({
                    status : 401,
                    message : "User email is not correct"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            status : 500,
            message : error.message
        })
    }
}

const emailResetPassword = async (req, res) => {
    const { email } = req.body
    if (email) {
        const user = await user_schema.findOne({ email: email })
        console.log("email user id==>",user._id);
        if (user) {
            const secret = user._id + process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userID: user._id }, secret,
                { expiresIn: "2d" })
            const link = `http://127.0.0.1:3000/api/user/reset${user._id}/${token}`
            let info = await transporter.sendMail({
                from : "rinkesh270698@gmail.com",
                to : email,
                subject : "This is th password reset link only for 10 minutes ",
                text : `<a href= ${link}>Click here to reset password </a>`
            })
            return res.status(200).json({
                status : 200,
                message : "password-reset check your email  ",
                token : token,
                userID : user._id
            })
        } else {
            res.status(550).json({
                status : "Failed",
                message : "user email required"
            })
        }
    } else {
        return res.status(500).json({
            status : 500,
            message : "usre email not found"
        })
    }
}

const userResetPassword = async (req, res) => {
    try {
        const { password, conform_password } = req.body
        const { id, token } = req.params
        const user = await user_schema.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        jwt.verify(token, new_secret)
        console.log(password && conform_password);
        if (password && conform_password) {
if (password !== conform_password) {
    return res.send({
        status : 401,
        message : "password and conform password should be same"
    })
            } else {
                const salt = await bcrypt.genSalt(10);
                const new_password = await bcrypt.hash(password, salt);
                await user_schema.findByIdAndUpdate(user._id, { $set: { password: new_password } })
                return res.status(200).send({
                    status : "Success",
                    message : "Password Reset Succesfully"
                })
            }
        } else {
            res.status(403).json({
                status : "Failed",
                message : "All Field Are Required"
            })
        }
    } catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
        })
    }
}


module.exports = {
    signUp, logIn, emailResetPassword, userResetPassword
}
