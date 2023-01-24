import { exists } from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
import urlExist from "url-exist";
// const cors = require("cors");
const bp = require("body-parser");
// const moment = require("moment");
// var validator = require("email-validator");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
const port = process.env.PORT || 5000;
let videosData = require("./exampleresponse.json");
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
app.get("/", (req, res) => {
  // Delete this line after you've confirmed your server is running
  // res.send({ express: "Your Backend Service is Running" });
  res.json({ videosData });
});

app.post("/", (req, res) => {
  // send(`Title and url of the Video can't be empty`);
  const jsonFail = {
    result: "failure",
    message: "Video could not be saved",
  };
  if (!req.body.title || !req.body.url) {
    res.status(400);
    res.json(jsonFail);
    return;
  } else {
    // check the url and title is dublicate
    (async () => {
      const exists = await urlExist(req.body.url);
      // Handle result
      if (exists) {
        //check if url or title is already exist in your album
        // This is not working right now becuse we are sending only id
        // This when the video added to our data
        const arrayurl =   videosData.map((video) => video.url);
        const arraytitle = videosData.map((video) => video.title);
        if (
          arrayurl.includes(req.body.url) ||
          arraytitle.includes(req.body.title)
        ) {
          // res.status(400);
          // res.send(`url of this video already exist in your album`);
          res.json(jsonFail);
          return;
        }
        else {
          // I know there are many options for creating videos id, but I would like make it as 6 digist and unique as follows
          const arrayId = videosData.map((video) => parseInt(video.id));
          let id = arrayId[0];
          while (arrayId.includes(id)) {
            id = Math.floor(100000 + Math.random() * 900000);
          }
          res.json(id);
          return;
        }
      } else {
        console.log("fail url")
        res.json(jsonFail);
        return;
      }
    })();
    return;
  }
});
