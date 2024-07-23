const { DataTypes } = require("sequelize");
const sequelize = require("../db");


const userModel = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING(65000),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

userModel
  .sync()
  .then((res) => console.log("User Modeli Güncellendi".green))
  .catch((err) => {
    console.log("User Modeli Güncellenemedi".red);
    console.log(err);
  });

module.exports = userModel;
