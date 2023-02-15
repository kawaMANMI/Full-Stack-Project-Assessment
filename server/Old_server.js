import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
import urlExist from "url-exist";
const cors = require("cors");
const bp = require("body-parser");
// const moment = require("moment");
// var validator = require("email-validator");

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
  const requestedIndex = videosData.findIndex(
    (video) => video.id.toString() === req.params.id
  );
  if (requestedIndex >= 0) {
    res.json(videosData[requestedIndex]);
    return;
  } else {
    res.status(400).send("Bad request");
    return;
  }
});

app.delete("/video/:id", (req, res) => {
  const requestedIndex = videosData.findIndex(
    (video) => video.id.toString() === req.params.id
  );

  if (requestedIndex >= 0) {
    videosData = videosData.filter((video, index) => index !== requestedIndex);
    videosData = [...videosData];
    // console.log("Kawa");
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

//Ordering data
app.get("/videos", (req, res) => {
  const typeOfOrder = req.query.order;
  const orderDataAccordingToVoteRate = (data, sign) => {
    data.sort((a, b) => sign * b.rating - sign * a.rating);
    data = [...data];
    return data;
  };
  if (typeOfOrder === "asc") {
    orderDataAccordingToVoteRate(videosData, -1);
  } else if (typeOfOrder === "desc" || !typeOfOrder) {
    orderDataAccordingToVoteRate(videosData, 1);
  }
  res.json(videosData);
});

// This was for level 200, just as requirement of the task
// app.post("/video", (req, res) => {
//   // send(`Title and url of the Video can't be empty`);
//   const jsonFail = {
//     result: "failure",
//     message: "Video could not be saved",
//   };
//   if (!req.body.title || !req.body.url) {
//     res.status(400);
//     res.json(jsonFail);
//     return;
//   } else {
//     // check the url and title is dublicate
//     (async () => {
//       const exists = await urlExist(req.body.url);
//       // Handle result
//       if (exists) {
//         //check if url or title is already exist in your album
//         // This is not working right now becuse we are sending only id
//         // This when the video added to our data
//         const arrayurl = videosData.map((video) => video.url);
//         const arraytitle = videosData.map((video) => video.title);
//         if (
//           arrayurl.includes(req.body.url) ||
//           arraytitle.includes(req.body.title)
//         ) {
//           // res.status(400);
//           // res.send(`url of this video already exist in your album`);
//           res.json(jsonFail);
//           return;
//         } else {
//           // I know there are many options for creating videos id, but I would like make it as 6 digist and unique as follows
//           const arrayId = videosData.map((video) => parseInt(video.id));
//           let id = arrayId[0];
//           while (arrayId.includes(id)) {
//             id = Math.floor(100000 + Math.random() * 900000);
//           }
//           res.json(id);
//           return;
//         }
//       } else {
//         res.json(jsonFail);
//         return;
//       }
//     })();
//     return;
//   }
// });
