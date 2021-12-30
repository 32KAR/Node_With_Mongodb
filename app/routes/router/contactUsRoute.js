const express = require('express');
const router = express();

const contactUsController = require("../../controllers/contactUsController");
const { authenticate } = require("../../startup/authToken");

router.get('/contactUs', authenticate, contactUsController.viewContactUs);
router.get('/showAddContactUs', authenticate, contactUsController.showAddContactUs);
router.post('/addContactUs', authenticate, contactUsController.addContactUs);

router.get('/showEditContactUs/:id', authenticate, contactUsController.showEditContactUs);
router.post('/editContactUs/:id', authenticate, contactUsController.editContactUs);

router.get('/deleteContactUs/:id', authenticate, contactUsController.deleteContactUs);
router.get('/multiDeleteContactUs', authenticate, contactUsController.multiDeleteContactUs);

module.exports = router;