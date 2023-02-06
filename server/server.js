import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
import urlExist from "url-exist";
import { resourceLimits } from "worker_threads";
const cors = require("cors");
const bp = require("body-parser");
const { Pool } = require("pg");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
// let videosData = require("./exampleresponse.json");
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
  // user: "kawa",
  // host: "dpg-cfbi33pgp3jsh6aqrnag-a.oregon-postgres.render.com",
  // database: "videosproject_kawa_cyf",
  // password: process.env.DB_PASSWORD,
  // ssl: { rejectUnauthorized: false }
  // port: 5432,
//   connectionString:
//     `postgres://kawa:${process.env.DB_PASSWORD}@dpg-cfbi33pgp3jsh6aqrnag-a.oregon-postgres.render.com/videosproject_kawa_cyf`,
//   ssl: { rejectUnauthorized: false }
// });

connectionString:
`postgres://kawa:xea5cgoHN7vSXkLYgi1pV60RwVRdJIQK@dpg-cfbi33pgp3jsh6aqrnag-a.oregon-postgres.render.com/videosproject_kawa_cyf`,
ssl: { rejectUnauthorized: false }
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database");
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
        const checkDublicateUrl = await pool
          .query("select EXISTS (SELECT  * FROM videodetials  WHERE url=$1)", [
            req.body.url,
          ])
          .then((result) => result.rows);

        const checkDublicateTitle = await pool
          .query(
            "select EXISTS (SELECT  * FROM videodetials  WHERE title=$1)",
            [req.body.title]
          )
          .then((result) => result.rows);

        if (!checkDublicateUrl[0].exists && !checkDublicateTitle[0].exists) {
          const maximumId = await pool
            .query("select MAX(id) FROM videodetials")
            .then((result) => result.rows)
            .catch((error) => {
              res.status(500).json(error);
            });
          const query =
            "INSERT INTO VideoDetials (id, title, url, rating, upload_date) VALUES ($1, $2, $3, $4, $5)";
          await pool
            .query(query, [
              maximumId[0].max + 1,
              req.body.title,
              req.body.url,
              0,
              new Date(),
            ])
            .then((result) => res.json(maximumId[0].max + 1))
            .catch((error) => {
              res.status(500).json(jsonFail);
            });
          return;
        } else res.status(500).json(jsonFail);
        return;
      }
      res.status(500).json(jsonFail);
      return;
    })();
    return;
  }
});

//Adding like or Dislike
app.post("/video/likedislike/:id/:type", (req, res) => {
  pool
    .query("UPDATE videodetials SET rating=rating+$1 WHERE id=$2", [
      req.params.type,
      req.params.id,
    ])
    .then(() => res.json("updated"))
    .catch((error) => {
      res.status(500).json(error);
      return;
    });
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
  const videoId = req.params.id;
  pool
    .query("DELETE FROM videodetials WHERE id=$1", [videoId])
    .then(() =>
      pool
        .query("SELECT * FROM videodetials")
        .then((result) => res.json(result.rows))
    )
    .catch((error) => {
      res.status(500).json(error);
    });
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
  } else {
    pool
      .query("SELECT * FROM videodetials")
      .then((result) => res.json(result.rows))
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});



app.get('/kawa', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send(`Your IP address is: ${clientIp}`);
});