const logger = require('../startup/logging');
const ContactUsModel = require("../models/contactUsModel");
const { contactUsValidation } = require('../validation/contactUsValidation');

exports.contactUs = (req, res) => {
    res.render('ContactUs', {
        values: req.body
    });
}

exports.showAddContactUs = (req, res) => {
    res.render('addContactUs', {
        values: req.body
    });
}

exports.addContactUs = async (req, res) => {
    try {
        let { error } = contactUsValidation(req.body);
        if (error) {
            if (error.details[0].context.key == 'contact_name') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'contact_email') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'contact_no') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'msg') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error5: err1,
                    values: req.body
                });
            }
        } else {
            const user = {
                contact_name: req.body.contact_name,
                contact_email: req.body.contact_email,
                contact_no: req.body.contact_no,
                msg: req.body.msg,
                date: req.body.date,
            };
            const userData = await new ContactUsModel(user)
            await userData.save().then(
                data => {
                    res.redirect('/contactUs');
                });

        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.viewContactUs = async (req, res) => {
    try {
        const user = await ContactUsModel.find();
        console.log(user);
        if (user) {
            res.render('contactUs', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.showEditContactUs = async (req, res) => {
    try {
        const user = await ContactUsModel.findById(req.params.id);
        if (user) {
            res.render('editContactUs', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.editContactUs = async (req, res) => {
    try {
        let { error } = contactUsValidation(req.body);
        if (error) {
            if (error.details[0].context.key == 'contact_name') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'contact_email') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'contact_no') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'msg') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'date') {
                var err1 = error.details[0].message;
                res.render('addContactUs', {
                    error5: err1,
                    values: req.body
                });
            }
        } else {
            const userData = await ContactUsModel.findByIdAndUpdate(req.params.id, {
                contact_name: req.body.contact_name,
                contact_email: req.body.contact_email,
                contact_no: req.body.contact_no,
                msg: req.body.msg,
                date: req.body.date,
            });
            if (userData) {
                res.redirect('/contactUs');
            }
        }
    }
    catch (err) {
        logger.error("err", err);
    }
}

exports.deleteContactUs = async (req, res) => {
    try {
        const user = await ContactUsModel.findById(req.params.id);
        await ContactUsModel.deleteOne(user);
        await res.redirect('/contactUs');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeleteContactUs = (req, res) => {
    try {
        console.log(req.query);
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            ContactUsModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/contactUs');

    } catch (err) {
        logger.error("err", err);
    }
}
