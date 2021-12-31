const Joi = require('joi');


const registrationValidation = (reqBody) => {
    // schema using Joi
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(255)
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(reqBody);
};

const loginValidation = (reqBody) => {
    // schema using Joi
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(reqBody);
};

module.exports = { registrationValidation, loginValidation };
