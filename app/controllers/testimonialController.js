const logger = require('../startup/logging');
const TestimonialModel = require("../models/testimonialModel");
const { testimonialValidate } = require('../validation/testimonialValidation');

exports.testimonial = (req, res) => {
    res.render('testimonial', {
        values: req.body
    });
}

exports.showAddTestimonial = (req, res) => {
    res.render('addTestimonial', {
        values: req.body
    });
}

exports.addTestimonial = async (req, res) => {
    try {
        let { error } = testimonialValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'testi_name') {
                var err1 = error.details[0].message;
                res.render('addTestimonial', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                res.render('addTestimonial', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'testi_desc') {
                var err1 = error.details[0].message;
                res.render('addTestimonial', {
                    error3: err1,
                    values: req.body
                });
            }
        }
        if (!req.file) {
            res.render('registration', {
                error4: 'Image is not selected.',
                values: req.body
            });
        }
        else {
            const user = await new TestimonialModel({
                testi_name: req.body.testi_name,
                designation: req.body.designation,
                testi_desc: req.body.testi_desc,
                img: req.file.filename,
            });
            await user.save().then(
                data => {
                    res.redirect('/testimonial');
                });
        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.viewTestimonial = async (req, res) => {
    try {
        const user = await TestimonialModel.find();
        if (user) {
            res.render('testimonial', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.showEditTestimonial = async (req, res) => {
    try {
        const user = await TestimonialModel.findById(req.params.id);
        if (user) {
            res.render('editTestimonial', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.editTestimonial = async (req, res) => {
    try {
        let { error } = testimonialValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'testi_name') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'testi_desc') {
                var err1 = error.details[0].message;
                res.render('editTestimonial', {
                    error3: err1,
                    values: req.body
                });
            }
        }
        if (!req.file) {
            res.render('registration', {
                error4: 'Image is not selected.',
                values: req.body
            });
        }
        else {
            const userData = await TestimonialModel.findByIdAndUpdate(req.params.id, {
                testi_name: req.body.testi_name,
                designation: req.body.designation,
                testi_desc: req.body.testi_desc,
                img: req.file.filename,
            });
            if (userData) {
                res.redirect('/testimonial');
            }
        }
    }
    catch (err) {
        logger.error("err", err);
    }
}

exports.deleteTestimonial = async (req, res) => {
    try {
        const user = await TestimonialModel.findById(req.params.id);
        await TestimonialModel.deleteOne(user);
        await res.redirect('/testimonial');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeleteTestimonial = (req, res) => {
    try {
        console.log(req.query);
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            TestimonialModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/testimonial');

    } catch (err) {
        logger.error("err", err);
    }
}
