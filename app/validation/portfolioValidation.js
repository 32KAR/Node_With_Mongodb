const Joi = require('joi');

function portfolioValidate(req) {
    const schema = Joi.object({
        proj_category: Joi.string().required().empty().messages({
            "string.base": `project category should be a type of 'text'`,
            "string.empty": `project category cannot be an empty field`,
            "any.required": `project category is a required field`,
        }),
        proj_name: Joi.string().required().empty().messages({
            "string.base": `project name should be a type of 'text'`,
            "string.empty": `project name cannot be an empty field`,
            "any.required": `project name is a required field`,
        }),
        proj_title: Joi.string().required().empty().messages({
            "string.base": `project title should be a type of 'text'`,
            "string.empty": `project title cannot be an empty field`,
            "any.required": `project title is a required field`,
        }),
        proj_date: Joi.string().required().empty().messages({
            "string.base": `project date should be a type of 'text'`,
            "string.empty": `project date cannot be an empty field`,
            "any.required": `project date is a required field`,
        }),
        proj_desc: Joi.string().required().empty().messages({
            "string.base": `project Description should be a type of 'text'`,
            "string.empty": `project Description cannot be an empty field`,
            "any.required": `project Description is a required field`,
        }),
        proj_image: Joi.optional(),

    });
    return schema.validate(req);
}

module.exports = { portfolioValidate };