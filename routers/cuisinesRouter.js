const express = require("express");
const {
    getCuisine,
    getCuisines
} = require("../controllers/cuisinesController");

const cuisinesRouter = express.Router();

cuisinesRouter.get("/", getCuisines);
cuisinesRouter.get("/:id", getCuisine);

module.exports = cuisinesRouter;