const recipeModel = require("../models/recipeModel");
const { Op } = require("sequelize");

const getRecipes = (req, res) => {
  recipeModel
    .findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const getRecipe = (req, res) => {
  recipeModel
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const getRecipesWithCategory = (req, res) => {
  recipeModel.findAll({
    where: {
      categoryId: req.params.categoryId
    }
  }).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(404).json(err);
  });
};

const getRecipesWithName = (req, res) => {
  recipeModel.findAll({
    where: {
      recipeName: {
        [Op.like]: `%${req.params.recipeName}%`
      }
    }
  }).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(404).json(err);
  });
};

const countRecipeWithCategory = (req, res) => {
  recipeModel
    .count({
      where: {
        categoryId: req.params.categoryId,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const getCurrentRecipes = (req, res) => {
  recipeModel.findAll({
    order: [["createdAt", "DESC"]],
    limit: 10,
  }).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    console.log(err);
    res.status(404).json(err);
  });
};

const postRecipe = (req, res) => {
  recipeModel
    .create(req.body)
    .then((data) => {
      res
        .status(201)
        .json({ message: "Yeni Tarif Başarılı Bir Şekilde Eklendi!".green });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};

const deleteRecipe = (req, res) => {
  recipeModel
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const updateRecipe = (req, res) => {
  recipeModel
    .update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

module.exports = {
  getRecipes,
  getRecipe,
  getRecipesWithCategory,
  getRecipesWithName,
  countRecipeWithCategory,
  getCurrentRecipes,
  postRecipe,
  deleteRecipe,
  updateRecipe,
};
