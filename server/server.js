const express = require("express");
const app = express();
onst cors = require("cors");
const bp = require("body-parser");
// const moment = require("moment");
// var validator = require("email-validator");
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
const port = process.env.PORT || 5000;
const videosData=require('./exampleresponse.json')
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  // res.send({ express: "Your Backend Service is Running" });
  res.json({ videosData })
});
