const jwt = require("jsonwebtoken");
const logger = require('./logging');
const config = require('config');

// Middeware for Generating a new JWT Token
const generateToken = (req, res, next) => {
    let token = jwt.sign({ email: req.body.email }, config.get('jwtPrivateKey'));
    res.cookie("jwt", token);
    next();
};

//authenticate
const authenticate = (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if (token == undefined) {
            res.redirect('/');
        }

        const verifyUser = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = verifyUser;
        next();
    } catch (error) {
        logger.info(error);
    }
}

module.exports = {
    authenticate,
    generateToken
};