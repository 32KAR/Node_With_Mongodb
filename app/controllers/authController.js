const bcrypt = require("bcrypt");
const saltRounds = 10;
const { AuthModel } = require("../models/db");
const { OTPsend } = require("../startup/otpSend");
const logger = require('../startup/logging');
const { registerValidate, loginValidate, passwordValidate, newPasswordValidate, profileValidate, resetPasswordValidate } = require('../validation/authValidation');

var otp = Math.floor(100000 + Math.random() * 900000);
logger.info(otp);

exports.register = (req, res) => {
    res.render('registration', {
        values: req.body
    });
}

exports.login = (req, res) => {
    res.render('login', {
        values: req.body
    });
}
exports.dashboard = (req, res) => {
    res.render('index', {
        values: req.body
    });
}

exports.forgotPassword = (req, res) => {
    res.render('forgotPassword')
}

exports.signup = async (req, res) => {
    try {
        let { error } = registerValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'fname') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'lname') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'confirm_password') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error5: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'phone') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error6: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'country') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error7: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error8: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'hobbies') {
                var err1 = error.details[0].message;
                res.render('registration', {
                    error9: err1,
                    values: req.body
                });
            }
        }
        if (!req.file) {
            res.render('registration', {
                error10: 'Image is not selected.',
                values: req.body
            });
        }
        else {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            AuthModel.findOne({ email: req.body.email }, async (err, response) => {
                if (!response) {
                    const user = await new AuthModel({
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        password: encryptedPassword,
                        phone: req.body.phone,
                        img: req.file.filename,
                        country: req.body.country,
                        gender: req.body.gender,
                        hobbies: req.body.hobbies,
                    });

                    await user.save((err, response) => {
                        if (err) {
                            let err1 = "User registration failed";
                            return res.render('registration', {
                                error: err1,
                                values: req.body
                            });

                        } else {
                            let success = "" + req.body.fname + "  " + req.body.lname + " successfully register";
                            return res.render('registration', {
                                error: success,
                                values: req.body
                            });
                        }
                    })

                } else {
                    let err1 = "User Email already exist";
                    return res.render('registration', {
                        error: err1,
                        values: req.body
                    });
                }
            })

        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.authUser = async (req, res) => {
    try {
        let { error } = loginValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('login', {
                    error2: err1,
                    values: req.body
                });
            }
        }
        AuthModel.findOne({ email: req.body.email }, async (err, response) => {
            if (response === null) {
                var err1 = "User not found";
                return res.render('login', {
                    error: err1,
                    values: req.body
                });

            } else {
                const comparision = await bcrypt.compare(req.body.password, response.password);
                if (comparision) {
                    // render index
                    res.render('index');

                } else {
                    var err1 = "Email and password does not match";

                    return res.render('login', {
                        error: err1,
                        values: req.body
                    });
                }
            }
        })
    } catch (err) {
        logger.error("err", err);
    }
};

exports.verifyEmail = async (req, res, next) => {
    try {
        let { error } = passwordValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                return res.render('forgetPassword', {
                    error1: err1
                });
            }
        }
        AuthModel.findOne({ email: req.body.email }, async (err, response) => {
            if (response) {
                OTPsend(req.body.email, otp);
                res.render('otp', {
                    email: req.body.email
                });
            }
            else {
                return res.render('forgotPassword', {
                    error: "Please enter valid Email"
                });
            }
        });
    } catch (err) {
        logger.error("err", err);

    }
};

exports.verifyOtp = async (req, res) => {
    try {
        if (otp == req.body.otp) {
            res.render('newPassword', {
                email: req.body.email,
            });

        } else {
            var err1 = "Please enter correst OTP";
            return res.render('otp', {
                error: err1,
                email: req.body.email,
            });
        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.updatePassword = async (req, res) => {
    try {
        let { error } = newPasswordValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'password') {
                let err1 = error.details[0].message;
                return res.render('newPassword', {
                    error1: err1,
                    email: req.body.email,
                });
            }
            if (error.details[0].context.key == 'confirm_password') {
                let err1 = error.details[0].message;
                return res.render('newPassword', {
                    error2: err1,
                    email: req.body.email,
                });
            }
        } else {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const updatePassword1 = { password: encryptedPassword };
            AuthModel.updateOne({ email: req.body.email }, updatePassword1, async (err, response) => {
                console.log("res", response);
                logger.info(response)
                if (err)
                    throw err;
                else
                    res.redirect('/')

            });
        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.viewProfile = async (req, res) => {
    console.log(req.user.email);
    const email = req.user.email;
    try {
        const user = await AuthModel.findOne({ email });
        console.log(user);
        if (user) {
            res.render('viewProfile', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.showProfile = async (req, res) => {
    const email = req.user.email;
    try {
        const user = await AuthModel.findOne({ email });
        if (user) {
            res.render('updateProfile', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let { error } = profileValidate(req.body);
        if (error) {

            if (error.details[0].context.key == 'fname') {
                var err1 = error.details[0].message;
                res.render('updateProfile', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'lname') {
                var err1 = error.details[0].message;
                res.render('updateProfile', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'email') {
                var err1 = error.details[0].message;
                res.render('updateProfile', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'phone') {
                var err1 = error.details[0].message;
                res.render('updateProfile', {
                    error6: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'country') {
                var err1 = error.details[0].message;
                res.render('updateProfile', {
                    error7: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'gender') {
                var err1 = error.details[0].message;
                res.render('updateProfile', {
                    error8: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'hobbies') {
                var err1 = error.details[0].message;
                res.render('updateProfile', {
                    error9: err1,
                    values: req.body
                });
            }
        } else {
            const email = req.user.email;

            const updateUser = await AuthModel.findOneAndUpdate({ email: email }, {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                img: req.file.filename,
                country: req.body.country,
                gender: req.body.gender,
                hobbies: req.body.hobbies,
            });
            if (updateUser) {
                return res.render('index', {
                    error: "User Profile is Updated",
                    values: req.body
                });
            }
            else {
                return res.render('updateProfile', {
                    error: "user details updation failed",
                    values: req.body
                });
            }
        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.resetPassword = (req, res) => {
    res.render('resetPassword')
}

exports.resetPass = async (req, res) => {
    try {
        let { error } = resetPasswordValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'current_password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error1: err1
                });
            }
            if (error.details[0].context.key == 'password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error2: err1
                });
            }
            if (error.details[0].context.key == 'confirm_password') {
                var err1 = error.details[0].message;
                return res.render('resetPassword', {
                    error3: err1
                });
            }
        } else {
            const email = req.user.email;
            const user = await AuthModel.findOne({ email });
            if (user) {
                const comparision = await bcrypt.compare(req.body.current_password, user.password);
                if (comparision) {
                    const updatePassword = { password: await bcrypt.hash(req.body.password, saltRounds) };
                    const updateUser = await AuthModel.updateOne({ email: email }, updatePassword);
                    if (updateUser) {
                        return res.render('resetPassword', {
                            error: "Your Password has been Reset"
                        });
                    } else {
                        return res.render('resetPassword', {
                            error: "Your Password has not been Reset"
                        });
                    }
                } else {
                    return res.render('resetPassword', {
                        error: "Current Password is incorrect",
                    });
                }
            }
        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.clearCookie("id");
        res.redirect('/');
    } catch (err) {
        logger.error("err", err);
    }
};
