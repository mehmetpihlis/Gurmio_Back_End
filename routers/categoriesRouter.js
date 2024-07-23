const express = require("express");
const {
    getCategories,
    getCategory
} = require("../controllers/categoriesController");

const recipesRouter = express.Router();

recipesRouter.get("/", getCategories);
recipesRouter.get("/:id", getCategory);

module.exports = recipesRouter;