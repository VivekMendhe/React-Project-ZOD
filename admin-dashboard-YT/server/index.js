require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ErrorMiddleware = require("./middlewares/error");
const router = require("./routers/router");

const app = express();
const url = process.env.MONGOOSE_URL;
const PORT = 3033;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

mongoose
  .connect(url)
  .then(() => console.log("Connect to database!"))
  .catch(() => console.error("Error connecting to database!"));

app.use("/api", router);

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} is not found!`);
  res.status(404).send({ error: err.message });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

app.use(ErrorMiddleware);
