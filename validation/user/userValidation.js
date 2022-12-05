const user_schema = require('./userSchema')

module.exports = {
    userValSchema: async (req, res, next) => {
        const value = await user_schema.usersignup.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.send({
                status : 400,
                message : value.error.details[0].message
            })
        } else {
            next()
        }
    },

    userLogValSchema: async (req, res, next) => {
        const value = await user_schema.userlogin.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.send({
                stattus : 400,
                message : value.error.details[0].message
            })
        } else {
            next()
        }
    }

}