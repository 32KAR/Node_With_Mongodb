const express = require('express');
const router = express();

const categoryController = require("../../controllers/categoryController");
const { authenticate } = require("../../startup/authToken");

router.get('/category', authenticate, categoryController.viewCategory);
router.get('/showAddCategory', authenticate, categoryController.showAddCategory);
router.post('/addCategory', authenticate, categoryController.addCategory);

router.get('/showEditCategory/:id', authenticate, categoryController.showEditCategory);
router.post('/editCategory/:id', authenticate, categoryController.editCategory);

router.get('/deleteCategory/:id', authenticate, categoryController.deleteCategory);
router.get('/allDeleteCategory', authenticate, categoryController.allDeleteCategory);
router.get('/multiDeleteCategory', authenticate, categoryController.multiDeleteCategory);

module.exports = router;