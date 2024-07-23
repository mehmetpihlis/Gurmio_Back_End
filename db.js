const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gurmio_db", "root", "", {
  dialect: "mysql"
});

sequelize
  .authenticate()
  .then((res) => {
    console.log("Database Bağlantısı Başarılı".green);
    /* 
    Bu modül entry point modülüne bağlı.
    Modellerin senkronizasyonu için de bağlantı doğrulandıktan sonra burada import ediyorum.
    Her modelin senkronizasyon metodu kendi dosyasında çağrılmıştır.
    */
   require("./models/categoryModel");
   require("./models/cuisineModel");
   require("./models/recipeModel");
  })
  .catch((err) => {
    console.log("Database Bağlantısı Başarısız!".red);
    console.log(err);
  });

module.exports = sequelize;