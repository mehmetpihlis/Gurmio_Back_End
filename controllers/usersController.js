const userModel = require("../models/userModel");
const tokenModel = require("../models/tokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = (req, res) => {
  userModel
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

const signUpUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, profileImage ,password ,confirmPassword } =
      req.body;

    const user = await userModel.findOne({ where: { email: email } });

    if (user) {
      res
        .status(409)
        .json({ message: "Bu email'e sahip başka bir kullanıcı var" });
      return 0;
    }
    
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Şifreler Uyuşmuyor" });
      return 0;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      age,
      email,
      profileImage,
      password: hashedPassword,
    };

    userModel.create(newUser).then((data) => {
      // JWT Proccess
      const accessToken = jwt.sign(
        {
          email: data.email,
          id: data.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "6m",
        }
      );
      const refreshToken = jwt.sign(
        {
          email: data.email,
          id: data.id,
        },
        process.env.REFRESH_TOKEN_SECRET
      );
      tokenModel.create({
        userId: data.id,
        refreshToken: refreshToken,
      });

      res.status(201).json({ user: data, accessToken });
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

  const user = await userModel.findOne({
    where: {
      email: email
    }
  });

  if (!user) {
    return res.status(404).json({
      message: "Kullanıcı Bulunamadı!",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Kullanıcı Bilgilerini Kontrol Edin",
    });
  }

  const accessToken = jwt.sign(
    { email, password },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "6m",
    }
  );

  const refreshToken = jwt.sign(
    {
      email,
      password,
    },
    process.env.REFRESH_TOKEN_SECRET
  );

  await tokenModel.update(
    {
      refreshToken: refreshToken,
    }, 
    {
      where: {
          userId: user.id,
      }
    }
  );

  res.status(201).json({ user, accessToken });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
}

const LogOut = (req, res) => {
  tokenModel.update({ refreshToken: null }, { where: { userId: req.params.id } }).then((data) => {
    console.log("Çıkış İşlemi Başarılı")
    res.status(200).json(data);
  }).catch((err) => {
    console.log("Çıkış İşlemi Başarısız");
    console.log(err)
  });
};

const refreshAccessToken = async (req, res) => {
  try {
    const { id } = req.params;
    const { refreshToken } = await tokenModel.findOne({ where: {userId: id} });

    if (!refreshToken) {
      console.log("Yetkisiz");
      return res.status(403).json({
        message: "Yetkisiz",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(404).json(err);
        }

        const accessToken = jwt.sign(
          { email: decoded.email, id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "6m",
          }
        );

        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser,
  signUpUser,
  LogOut,
  signInUser,
  refreshAccessToken
};
