const joi = require('@hapi/joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);


const user_schema = {
    usersignup : joi.object ({
        name : joi.string().min(3).max(20).messages({ "string empty" : "user name is required"}).required(),
        email : joi.string().messages({ "string empty" : "user email is required"}).required(),
        password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .messages({
              'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
              'password.minOfSpecialCharacters':'{#label} should contain at least {#min} special character',
              'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
              'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
              'password.noWhiteSpaces': '{#label} should not contain white spaces',
        }),
        city : joi.string().messages({ "string empty" : "user city is required"}).required(),
        state : joi.string().messages({"string.state" : "user state is required"}).required()
    }).unknown(true),
       
    userlogin : joi.object ({
        email : joi.string().messages({"string.empty" : "user email is required"}).required(),
        password : joi.string().required()
    }).unknown(true)
    
}

module.exports = user_schema;