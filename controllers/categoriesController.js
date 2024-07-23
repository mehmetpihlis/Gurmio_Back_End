const categoryModel = require("../models/categoryModel");

const getCategories = (req, res) => {
    categoryModel.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status.json(err);
    });
};

const getCategory = (req, res) => {
    categoryModel.findOne({ where: {
        id: req.params.id
    } }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(404).json(err);
    });
};

module.exports = {
    getCategories,
    getCategory
};