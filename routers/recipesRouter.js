const express = require("express");
const { 
    getRecipes,
    getRecipe,
    getRecipesWithCategory,
    getRecipesWithName,
    countRecipeWithCategory,
    getCurrentRecipes,
    postRecipe,
    deleteRecipe,
    updateRecipe
 } = require("../controllers/recipesController");

const recipesRouter = express.Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/current", getCurrentRecipes);
recipesRouter.get("/:id", getRecipe);
recipesRouter.get("/categoryRecipes/:categoryId", getRecipesWithCategory);
recipesRouter.get("/count/:categoryId", countRecipeWithCategory);
recipesRouter.get("/finder/:recipeName", getRecipesWithName);
recipesRouter.post("/", postRecipe);
recipesRouter.delete("/:id", deleteRecipe);
recipesRouter.put("/:id", updateRecipe);

module.exports = recipesRouter;