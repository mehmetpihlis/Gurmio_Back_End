const express = require("express");
const catgoriesRouter = require("./routers/categoriesRouter");
const cuisinesRouter = require("./routers/cuisinesRouter");
const recipesRouter = require("./routers/recipesRouter");
const usersRouter = require("./routers/usersRouter");
const cors = require("cors");
require("./db");
require("dotenv").config();
require("colors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/categories", catgoriesRouter);
app.use("/cuisines", cuisinesRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}. Port Dinleniyor`.bgBlack.green);
});
