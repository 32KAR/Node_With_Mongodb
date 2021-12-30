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

const testimonialController = require("../../controllers/testimonialController");
const { authenticate } = require("../../startup/authToken");

router.get('/testimonial', authenticate, testimonialController.viewTestimonial);
router.get('/showAddTestimonial', authenticate, testimonialController.showAddTestimonial);
router.post('/addTestimonial', authenticate, upload.single('img'), testimonialController.addTestimonial);

router.get('/showEditTestimonial/:id', authenticate, testimonialController.showEditTestimonial);
router.post('/editTestimonial/:id', authenticate, upload.single('img'), testimonialController.editTestimonial);

router.get('/deleteTestimonial/:id', authenticate, testimonialController.deleteTestimonial);
router.get('/multiDeleteTestimonial', authenticate, testimonialController.multiDeleteTestimonial);

module.exports = router;