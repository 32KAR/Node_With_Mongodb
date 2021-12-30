const nodemailer = require('nodemailer');
const logger = require('./logging');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,//true
    auth: {
        user: 'kaushikrathod3236@gmail.com',
        pass: 'ShivInfoTech@123'
    }
});

const OTPsend = (email, otp) => {
    let mailDetail = {
        to: email,
        subject: "OTP for new Password",
        html: "<h3>OTP for new password is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    }
    return transport.sendMail(mailDetail, function (error, res) {
        if (error) {
            throw error;
        } else {
            logger.info("email has been sent", res);
        }
    });
};
module.exports = {
    OTPsend
};