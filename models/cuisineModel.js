const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Default Values
const cuisines = [
  { name: "Türk Mutfağı" },
  { name: "İtalyan Mutfağı" },
  { name: "Fransız Mutfağı" },
  { name: "Çin Mutfağı" },
  { name: "Hint Mutfağı" },
  { name: "Japon Mutfağı" },
  { name: "Meksika Mutfağı" },
  { name: "Yunan Mutfağı" },
  { name: "İspanyol Mutfağı" },
  { name: "Amerikan Mutfağı" },
  { name: "Tayland Mutfağı" },
  { name: "Lübnan Mutfağı" },
];

const cuisineModel = sequelize.define(
  "cuisine",
  {
    cuisineName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

cuisineModel
  .sync()
  .then((res) => {
    console.log("Cuisine Modeli Güncellendi".green);

    // Sabit verilerin duracağı bir model bu yüzden verileri başlangıçta bir seferlik atıyorum
    // Sürekli atmaması için var mı yok mu kontrol ediyorum
    for (var cuisine of cuisines) {
      cuisineModel.findOrCreate({
        where: {
          cuisineName: cuisine.name
        }
      })
    }
  })
  .catch((err) => {
    console.log("Cuisine Modeli Güncellenemedi".red);
    console.log(err);
  });

module.exports = cuisineModel;
