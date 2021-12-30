const Joi = require('joi');

function categoryValidate(req) {
    const schema = Joi.object({
        categoryname: Joi.string().required().empty().messages({
            "string.base": `category name should be a type of 'text'`,
            "string.empty": `category name cannot be an empty field`,
            "any.required": `category name is a required field`,
        }),
    });
    return schema.validate(req);
}

module.exports = { categoryValidate };