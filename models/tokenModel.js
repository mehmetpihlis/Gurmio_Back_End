const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const tokenModel = sequelize.define("token", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});

tokenModel
  .sync()
  .then((res) => console.log("Token Modeli Güncellendi".green))
  .catch((err) => {
    console.log("Token Modeli Güncellenemedi".red);
    console.log(err);
  });

module.exports = tokenModel;