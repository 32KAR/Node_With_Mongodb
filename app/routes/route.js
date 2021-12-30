const express = require("express");
const router = express();

const userRoute = require('./router/userRoute');
const categoryRoute = require('./router/categoryRoute');
const testimonialRoute = require('./router/testimonialRoute');
const contactUsRoute = require('./router/contactUsRoute');
const portfolioRoute = require('./router/portfolioRoute');

router.use('/', userRoute);
router.use('/', categoryRoute);
router.use('/', testimonialRoute);
router.use('/', contactUsRoute);
router.use('/', portfolioRoute);

module.exports = router;