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

const portfolioController = require("../../controllers/portfolioController");
const { authenticate } = require("../../startup/authToken");

router.get('/portfolio', authenticate, portfolioController.viewPortfolio);
router.get('/showAddPortfolio', authenticate, portfolioController.showAddPortfolio);
router.post('/addPortfolio', authenticate, upload.array('proj_image', 5), portfolioController.addPortfolio);

router.get('/showEditPortfolio/:id', authenticate, portfolioController.showEditPortfolio);
router.post('/editPortfolio/:id', authenticate, upload.array('proj_image', 5), portfolioController.editPortfolio);

router.get('/deletePortfolio/:id', authenticate, portfolioController.deletePortfolio);
router.get('/multiDeletePortfolio/', authenticate, portfolioController.multiDeletePortfolio);

module.exports = router;