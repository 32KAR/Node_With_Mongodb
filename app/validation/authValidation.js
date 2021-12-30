const Joi = require('joi');

function registerValidate(req) {
    const schema = Joi.object({
        fname: Joi.string().required().empty().messages({
            "string.base": `first name should be a type of 'text'`,
            "string.empty": `first name cannot be an empty field`,
            "any.required": `first name is a required field`,
        }),
        lname: Joi.string().required().empty().messages({
            "string.base": `last name should be a type of 'text'`,
            "string.empty": `last name cannot be an empty field`,
            "any.required": `last name is a required field`,
        }),
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        password: Joi.string().required().empty().min(6).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "any.required": `password is a required field`,
        }),
        confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        }),
        phone: Joi.number().required().min(10).empty().messages({
            "number.base": `phone number should be a type of 'number'`,
            "number.empty": `phone number cannot be an empty field`,
            "number.min": "phone number should be of minimum 10 digits",
            "any.required": `phone number is a required field`,
        }),
        country: Joi.string().required().empty().messages({
            "string.base": `country should be selected`,
            "string.empty": `country cannot be an empty field`,
            "any.required": `country is a required field`,
        }),
        gender: Joi.string().required().empty().messages({
            "string.base": `gender should be selected`,
            "string.empty": `gender cannot be an empty field`,
            "any.required": `gender is a required field`,
        }),
        hobbies: Joi.required().empty().messages({
            "string.empty": `hobbies cannot be an empty field`,
            "any.required": `hobbies is a required field`,
        }),
        img: Joi.optional(),
    });
    return schema.validate(req);
}

function loginValidate(req) {
    const schema = Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        })
    });
    return schema.validate(req);
}

function passwordValidate(req) {
    const schema = Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        })
    });
    return schema.validate(req);
}

function newPasswordValidate(req) {
    const schema = Joi.object({
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        }),
        email: Joi.optional()
    });
    return schema.validate(req);
}

function profileValidate(req) {
    const schema = Joi.object({
        fname: Joi.string().required().empty().messages({
            "string.base": `first name should be a type of 'text'`,
            "string.empty": `first name cannot be an empty field`,
        }),
        lname: Joi.string().required().empty().messages({
            "string.base": `last name should be a type of 'text'`,
            "string.empty": `last name cannot be an empty field`,
            "any.required": `last name is a required field`,
        }),
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        phone: Joi.number().required().min(10).empty().messages({
            "number.base": `phone number should be a type of 'number'`,
            "number.empty": `phone number cannot be an empty field`,
            "number.min": "phone number should be of minimum 10 digits",
            "any.required": `phone number is a required field`,
        }),
        country: Joi.string().required().empty().messages({
            "string.base": `country should be selected`,
            "string.empty": `country cannot be an empty field`,
            "any.required": `country is a required field`,
        }),
        gender: Joi.string().required().messages({
            "string.base": `gender should be selected`,
            "any.required": `gender is a required field`,
        }),
        hobbies: Joi.required().messages({
            "any.required": `hobbies is a required field`,
        }),
        img: Joi.optional()

    });
    return schema.validate(req);
}

function resetPasswordValidate(req) {
    const schema = Joi.object({
        current_password: Joi.string().empty().required().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `password is a required field`,
        }),
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    });
    return schema.validate(req);
}

module.exports = {
    registerValidate, loginValidate, passwordValidate, newPasswordValidate, profileValidate, resetPasswordValidate
};