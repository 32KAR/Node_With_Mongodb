const logger = require('../startup/logging');
const CategoryModel = require("../models/categoryModel")
const PortfolioModel = require("../models/PortfolioModel");
const { portfolioValidate } = require('../validation/portfolioValidation');

exports.portfolio = (req, res) => {
    res.render('portfolio', {
        values: req.body
    });
}

exports.showAddPortfolio = async (req, res) => {
    try {
        const user = await CategoryModel.find();
        if (user) {
            res.render('addPortfolio', {
                values: user
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.addPortfolio = async (req, res) => {
    try {
        let { error } = portfolioValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'proj_category') {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_name') {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_title') {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_date') {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_desc') {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error5: err1,
                    values: req.body
                });
            }
        }
        if (!req.files) {
            res.render('registration', {
                error6: 'Image is not selected.',
                values: req.body
            });
        }
        else {
            const mulImg = req.files.map((mulImg) => mulImg.filename);
            const user = await new PortfolioModel({
                proj_category: req.body.proj_category,
                proj_name: req.body.proj_name,
                proj_title: req.body.proj_title,
                proj_image: mulImg,
                proj_date: req.body.proj_date,
                proj_desc: req.body.proj_desc,
            });
            await user.save().then(
                data => {
                    res.redirect('/portfolio');
                });
        }
    }
    catch (err) {
        logger.error("err", err);
    }
};

exports.viewPortfolio = async (req, res) => {
    try {
        const user = await PortfolioModel.aggregate([{
            $lookup: {
                from: 'categories',
                localField: 'categoryname',
                foreignField: 'proj_category',
                as: 'output'
            }
        }]);
        console.log("user", user);
        if (user) {
            res.render('portfolio', {
                values: user,
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.showEditPortfolio = async (req, res) => {
    try {
        const categoryUser = await CategoryModel.find();
        const user = await PortfolioModel.findById(req.params.id);
        if (user && categoryUser) {
            res.render('editPortfolio', {
                values: user,
                categoryValues: categoryUser
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
}

exports.editPortfolio = async (req, res) => {
    try {
        let { error } = portfolioValidate(req.body);
        if (error) {
            if (error.details[0].context.key == 'proj_category') {
                var err1 = error.details[0].message;
                res.render('editPortfolio', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_name') {
                var err1 = error.details[0].message;
                res.render('editPortfolio', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_title') {
                var err1 = error.details[0].message;
                res.render('editPortfolio', {
                    error3: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_date') {
                var err1 = error.details[0].message;
                res.render('editPortfolio', {
                    error4: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'proj_desc') {
                var err1 = error.details[0].message;
                res.render('editPortfolio', {
                    error5: err1,
                    values: req.body
                });
            }
        }
        if (!req.files) {
            res.render('registration', {
                error6: 'Image is not selected.',
                values: req.body
            });
        }
        else {
            const mulImg = req.files.map((mulImg) => mulImg.filename);
            const userData = await PortfolioModel.findByIdAndUpdate(req.params.id, {
                proj_category: req.body.proj_category,
                proj_name: req.body.proj_name,
                proj_title: req.body.proj_title,
                proj_image: mulImg,
                proj_date: req.body.proj_date,
                proj_desc: req.body.proj_desc,
            });
            if (userData) {
                res.redirect('/portfolio');
            }
        }
    }
    catch (err) {
        logger.error("err", err);
    }
}

exports.deletePortfolio = async (req, res) => {
    try {
        const user = await PortfolioModel.findById(req.params.id);
        await PortfolioModel.deleteOne(user);
        await res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}

exports.multiDeletePortfolio = (req, res) => {
    try {
        console.log(req.query);
        var id = req.query;
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            PortfolioModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err)
                    logger.error("err", err);
            });

        }
        res.redirect('/portfolio');

    } catch (err) {
        logger.error("err", err);
    }
}
