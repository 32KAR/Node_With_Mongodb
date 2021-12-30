const logger = require('../startup/logging');
const CategoryModel = require("../models/categoryModel");
const { categoryValidate } = require('../validation/categoryValidation');

exports.category = (req, res) => {
    res.render('category', {
        values: req.body
    });
}

exports.showAddCategory = (req, res) => {
    res.render('addCategory', {
        values: req.body
    });
}

exports.addCategory = async (req, res) => {
    try {
        let { error } = categoryValidate(req.body);
        if (error) {
            console.log(error)
            if (error.details[0].context.key == 'categoryname') {
                var err1 = error.details[0].message;
                res.render('addCategory', {
                    error1: err1,
                    values: req.body
                });
            }
        } else {
            const user = {
                categoryname: req.body.categoryname,
            };
            const userData = await new CategoryModel(user)
            await userData.save().then(
                data => {
                    res.redirect('/category');
                });

        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.viewCategory = async (req, res) => {
    try {
        const user = await CategoryModel.find();
        if (user) {
            res.render('category', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.showEditCategory = async (req, res) => {
    try {
        const user = await CategoryModel.findById(req.params.id);
        if (user) {
            res.render('editCategory', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.editCategory = async (req, res) => {
    try {
        let { error } = categoryValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'categoryname') {
                var err1 = error.details[0].message;
                res.render('editCategory', {
                    error1: err1,
                    values: req.body
                });
            }
        } else {
            const userData = await CategoryModel.findByIdAndUpdate(req.params.id, {
                categoryname: req.body.categoryname,
            });
            if (userData) {
                res.redirect('/category');
            }
        }
    }
    catch (err) {
        logger.error("err", err);
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const user = await CategoryModel.findById(req.params.id);
        await CategoryModel.deleteOne(user);
        await res.redirect('/category');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.allDeleteCategory = async (req, res) => {
    try {
        await CategoryModel.deleteMany();
        await res.redirect('/category');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeleteCategory = (req, res) => {
    try {
        console.log(req.query);
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            CategoryModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/category');

    } catch (err) {
        logger.error("err", err);
    }
}
