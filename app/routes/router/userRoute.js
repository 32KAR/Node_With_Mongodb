const express = require('express');
const router = express();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'app/uploads')
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({
    storage: storage
});

const authController = require("../../controllers/authController");
const { generateToken, authenticate } = require("../../startup/authToken");

router.get("/", authController.login);
router.get("/dashboard", authenticate, authController.dashboard);
router.post("/loginUser", generateToken, authController.authUser);

router.get('/registration', authController.register);
router.post('/signup', upload.single('img'), authController.signup);

router.post('/verifyEmail', authController.verifyEmail);
router.post("/verifyOtp", authController.verifyOtp);

router.post("/updatePassword", authController.updatePassword);
router.get('/forgotPassword', authController.forgotPassword);

router.get("/viewProfile", authenticate, authController.viewProfile);
router.get("/showProfile", authenticate, authController.showProfile);
router.post("/updateProfile", authenticate, upload.single('img'), authController.updateProfile);

router.get("/resetPassword", authenticate, authController.resetPassword);
router.post("/resetPass", authenticate, authController.resetPass);

router.get('/logout', authController.logout);

module.exports = router;