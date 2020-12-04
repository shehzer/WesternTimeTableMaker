//Validation
const { string } = require('@hapi/joi');
const Joi = require('@hapi/joi');
    
//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('ADMIN', 'USER', 'MANAGER'),
        active: Joi.string().valid('active', 'deactivated')
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};





module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
