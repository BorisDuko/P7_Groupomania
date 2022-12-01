const express = require("express");
// const helmet = require("helmet");
// to give path to express for getting static images from folder
const path = require("path");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// require("dotenv").config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// actual direction for app and add name from folder
app.use("/images", express.static(path.join(__dirname, "images")));

// security measures (2)
// app.use(helmet());
// app.use(mongoSanitize());

// app.use("/api/sauces", sauceRoutes);
// app.use("/api/auth", userRoutes);
// app.use("/users", userRoutes);
app.use("/", userRoutes);
app.use("/posts", postRoutes);
// app.use("/posts/:id", postRoutes); // for the page individual

// ------------------
module.exports = app;
