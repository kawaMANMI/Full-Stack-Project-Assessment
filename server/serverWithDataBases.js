import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
import urlExist from "url-exist";
const cors = require("cors");
const bp = require("body-parser");
const { Pool } = require("pg");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
let videosData = require("./exampleresponse.json");
app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];

// GET "/"
// app.get("/", (req, res) => {
//   // Delete this line after you've confirmed your server is running
//   // res.send({ express: "Your Backend Service is Running" });
//   res.json(videosData);
// });


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "videosproject_kawa_cyf",
  password: "cyf_wm42023",
  port: 5432,
});

app.post("/video", (req, res) => {
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
        const arrayurl = videosData.map((video) => video.url);
        const arraytitle = videosData.map((video) => video.title);
        if (
          arrayurl.includes(req.body.url) ||
          arraytitle.includes(req.body.title)
        ) {
          // res.status(400);
          // res.send(`url of this video already exist in your album`);
          res.json(jsonFail);
          return;
        } else {
          // I know there are many options for creating videos id, but I would like make it as 6 digist and unique as follows
          const arrayId = videosData.map((video) => parseInt(video.id));
          let id = arrayId[0];
          while (arrayId.includes(id)) {
            id = Math.floor(100000 + Math.random() * 900000);
          }
          const videoToAdd = {};
          videoToAdd.id = id;
          videoToAdd.title = req.body.title;
          videoToAdd.url = req.body.url;
          videoToAdd.rating = 0;
          const now = new Date();
          const date = now.toLocaleDateString();
          const time = now.toLocaleTimeString();
          videoToAdd.date = date;
          videoToAdd.time = time;
          videosData.push(videoToAdd);
          res.json(videosData);
          return;
        }
      } else {
        res.json(jsonFail);
        return;
      }
    })();
    return;
  }
});

//get video by id

app.get("/video/:id", (req, res) => {
    pool
    .query("SELECT * FROM videodetials WHERE id=$1", [req.params.id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      res.status(400).json(error);
    });
  });

app.delete("/video/:id", (req, res) => {
  const requestedIndex = videosData.findIndex(
    (video) => video.id.toString() === req.params.id
  );

  if (requestedIndex >= 0) {
    videosData = videosData.filter((video, index) => index !== requestedIndex);
    videosData = [...videosData];
    res.json(videosData);
    return;
  } else {
    res.json({
      result: "failure",
      message: "Video could not be deleted",
    });
    return;
  }
});


app.get("/videos", (req, res) => {
  let typeOfOrder = req.query.order;
  if (typeOfOrder === "asc") {
    pool
    .query("SELECT * FROM videodetials ORDER BY rating ASC")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      res.status(400).json(error);
    });
  } else if (typeOfOrder === "desc" || !typeOfOrder) {
    pool
    .query("SELECT * FROM videodetials ORDER BY rating DESC")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      res.status(400).json(error);
    });
  }
  else  {
    pool
    .query("SELECT * FROM videodetials")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      res.status(400).json(error);
    });
  }
});

