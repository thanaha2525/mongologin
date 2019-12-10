const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const homeController = require("./controllers/home-controller");
const pageNotFoundController = require("./controllers/page-not-found-controller");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.set("views", "views");

const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRoute);
app.get("/", homeController);
app.get("*", pageNotFoundController);
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://thanaha:tha0897451740@cluster0-bqeqv.mongodb.net/test?retryWrites=true",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("database connected!");
  })
  .catch(() => {
    console.log("cannot connect to database");
  });

const port = process.env.port || 3003;
app.listen(port, function() {
  console.log("app listennin on port", port);
});
