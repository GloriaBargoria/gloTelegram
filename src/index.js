const bodyParser = require("body-parser");
const express = require("express");
const config = require("../config");
const app = express();
const telegramRouter = require("./routes/telegramRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

const port = config.port;
const mongoURI = config.mongoURI;

app.use(express.json());

app.use(
  cors({
    origin: "*", // Allow requests from any origin (you may want to restrict this)
    credentials: true, // Allow credentials to be sent in cross-origin requests
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/telegram", telegramRouter);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!!");
    app.listen(port, () => {
      console.log("app is listening on port:", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
