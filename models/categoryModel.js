const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Default Values
const categories = [
  { categoryName: "Ana Yemekler" },
  { categoryName: "Tatlılar" },
  { categoryName: "Salatalar" },
  { categoryName: "Çorbalar" },
  { categoryName: "Aperatifler" },
  { categoryName: "İçecekler" },
  { categoryName: "Kahvaltılıklar" },
  { categoryName: "Atıştırmalıklar" },
  { categoryName: "Fırın Yemekleri" },
  { categoryName: "Deniz Ürünleri" },
  { categoryName: "Vejetaryen Yemekler" },
  { categoryName: "Glutensiz Yemekler" },
];

const categoryModel = sequelize.define(
  "category",
  {
    categoryName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

categoryModel
  .sync()
  .then((res) => {
    console.log("Category Modeli Güncellendi".green);

    // Sabit verilerin duracağı bir model bu yüzden verileri başlangıçta bir seferlik atıyorum
    // Sürekli atmaması için var mı yok mu kontrol ediyorum
    for (var category of categories) {
      categoryModel.findOrCreate({
        where: {
          categoryName: category.categoryName,
        },
      });
    }
  })
  .catch((err) => {
    console.log("Category Modeli Güncellenemedi".red);
    console.log(err);
  });

module.exports = categoryModel;
