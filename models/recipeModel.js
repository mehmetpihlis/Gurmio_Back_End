const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const categoryModel = require("./categoryModel");
const cuisineModel = require("./cuisineModel");

const recipeModel = sequelize.define(
  "recipe",
  {
    recipeName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING(65000),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(65000),
      allowNull: false,
    },
    totalTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: true,
  }
);

categoryModel.hasMany(recipeModel, {
  foreignKey: {
    name: "categoryId",
    type: DataTypes.INTEGER,
  },
});
cuisineModel.hasMany(recipeModel, {
  foreignKey: {
    name: "cuisineId",
    type: DataTypes.INTEGER,
  },
});

recipeModel
  .sync({ alter: true })
  .then((res) => console.log("Recipe Modeli Güncellendi".green))
  .catch((err) => {
    console.log("Recipe Modeli Güncellenemedi".red);
    console.log(err);
  });

module.exports = recipeModel;
