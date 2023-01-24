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
  if (!req.body.title || !req.body.url) {
    res.status(400).send(`Title and url of the Video can't be empty`);
    return;
  } else {
    let exists;
    (async () => {
       exists = await urlExist(req.body.url);
      // Handle result
      if (exists) {
        // I know there are many options for creating videos id, but I would like make it as 6 digist and unique as follows
        const arrayId = videosData.map((video) => parseInt(video.id));
        let id = arrayId[0];
        while (arrayId.includes(id)) {
          id = Math.floor(100000 + Math.random() * 900000);
        }

        //check if url is already exist in your album
        const arrayurl = videosData.map(
          (video) => video.url );
        if (arrayurl.includes(req.body.url)) {
          res.status(400)
          res.send(`url of this video already exist in your album`);
          return;
        }
        //check if title is already exist in your album
        const arraytitle = videosData.map(
          (video) => video.title );
        if (arraytitle.includes(req.body.title)) {
          res.status(400).send(`This title alreay exist in your album`);
          return;
        }
        let newVideo = {};
        newVideo.id = id;
        newVideo.title = req.body.title;
        newVideo.url = req.body.url;
        newVideo.rating = 0;
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        newVideo.date = date;
        newVideo.time = time;
        videosData.push(newVideo);
        res.json(videosData);
        return;
      } else {
        res.status(400);
        res.send(`Youtube URL is not exist`);
        return;
      }
    })();
    return;
  }
});
