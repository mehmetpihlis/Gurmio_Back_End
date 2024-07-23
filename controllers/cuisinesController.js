const cuisineModel = require("../models/cuisineModel");

const getCuisine = (req, res) => {
    cuisineModel.findOne({ where: {
        id: req.params.id
    } }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json(err);
    });
};

const getCuisines = (req, res) => {
    cuisineModel.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json(err);
    });
};

module.exports = {
    getCuisine,
    getCuisines
};