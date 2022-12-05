const jwt = require('jsonwebtoken')
const user_Schema = require('../models/user_Schema')

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    try {
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(" ")[1];
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await user_Schema.findById(userID).select('-password');
            console.log("auth user===>>>", req.user);
            next();
        } else {
            res.json({
                status : "failed",
                message : "authorization is empty or bearer"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status : "failed",
            message : error.message
        })

    } if (!token) {
        res.send({
            status : 401,
             message : "unauthorized user no token "
             })
    }
}


module.exports = {
    checkUserAuth
}