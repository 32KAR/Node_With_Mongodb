const Joi = require('joi');

function testimonialValidate(req) {
    const schema = Joi.object({
        testi_name: Joi.string().required().empty().messages({
            "string.base": `testimonial name should be a type of 'text'`,
            "string.empty": `testimonial name cannot be an empty field`,
            "any.required": `testimonial name is a required field`,
        }),
        designation: Joi.string().required().empty().messages({
            "string.base": `designation should be a type of 'text'`,
            "string.empty": `designation cannot be an empty field`,
            "any.required": `designation is a required field`,
        }),
        testi_desc: Joi.string().required().empty().messages({
            "string.base": `Testimonial Description should be a type of 'text'`,
            "string.empty": `Testimonial Description cannot be an empty field`,
            "any.required": `Testimonial Description is a required field`,
        }),
        img: Joi.optional(),

    });
    return schema.validate(req);
}

module.exports = { testimonialValidate };