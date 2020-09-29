const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// const dotenv = require("dotenv");
require("dotenv").config({ path: ".env" });

// console.log(process.env.MONGO_URI)
//mongodb://localhost:27017/nodeapp "mongodb+srv://stanloky:stanloky@pawrite.iqvdr.mongodb.net/blogapp?retryWrites=true&w=majority"

//db
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"));

mongoose.connection.on("error", err => {
  console.log(`Db connection error: ${err.messsage}`);
});

//Bring routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//apiDocs
app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

//middleware
app.use(morgan("dev"));
app.use(bodyparser.json({ extended: false }));
app.use(cookieparser());
app.use(cors());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizeError") {
    res.status(401).json({ error: "unauthorized" });
  }
});

// Server Static file
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("listening to {port}");
});
