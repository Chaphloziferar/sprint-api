import Joi from 'joi';

// SignUp Validation
const signUpValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
}

// SignIn Validation
const signInValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
}

exports.signUpValidation = signUpValidation;
exports.signInValidation = signInValidation;