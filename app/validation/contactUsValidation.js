const Joi = require('joi');

function contactUsValidation(req) {
    const schema = Joi.object({
        contact_name: Joi.string().required().empty().messages({
            "string.base": `contact name should be a type of 'text'`,
            "string.empty": `contact name cannot be an empty field`,
            "any.required": `contact name is a required field`,
        }),
        contact_email: Joi.string().required().empty().messages({
            "string.base": `contact email should be a type of 'text'`,
            "string.empty": `contact email cannot be an empty field`,
            "any.required": `contact email is a required field`,
        }),
        contact_no: Joi.number().required().empty().messages({
            "string.base": `contact Number should be a type of 'Number'`,
            "string.empty": `contact Number cannot be an empty field`,
            "any.required": `contact Number is a required field`,
        }),
        msg: Joi.string().required().empty().messages({
            "string.base": `Message should be a type of 'text'`,
            "string.empty": `Message cannot be an empty field`,
            "any.required": `Message is a required field`,
        }),
        date: Joi.date().required().empty().messages({
            "string.base": `contact date should be a type of 'date'`,
            "string.empty": `contact date cannot be an empty field`,
            "any.required": `contact date is a required field`,
        }),
    });
    return schema.validate(req);
}

module.exports = { contactUsValidation };