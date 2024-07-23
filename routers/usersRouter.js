const express = require("express");
const { getUser, signUpUser, LogOut, signInUser, refreshAccessToken } = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.get("/:id", getUser);
usersRouter.post("/signUp", signUpUser);
usersRouter.get("/logout/:id", LogOut);
usersRouter.post("/signIn", signInUser);
usersRouter.get("/refresh/:id", refreshAccessToken);

module.exports = usersRouter;