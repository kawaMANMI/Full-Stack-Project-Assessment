import React from "react";
import DislikeIcon from "./DislikeIcon";
import LikeIcon from "./LikeIcon";
import "../App.css";
import DeleteButton from "./DeleteButton";
// import { useState } from 'react';

const VideoCards = ({ videosData, dataChange }) => {
  const increaseVote = (index) => {
    videosData[index].rating++;
    videosData = [...videosData];

    dataChange(videosData);
  };

  const decreaseVote = (index) => {
    videosData[index].rating--;
    videosData = [...videosData];
    dataChange(videosData);
  };

  const deleteVideo = (index) => {
    if (window.confirm("Click OK to confirm the deletion")) {
      const filterVideos = videosData.filter(
        (video, videoIndex) => videoIndex !== index
      );
      videosData = [...filterVideos];
      dataChange(videosData);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {videosData.map((videoDetials, index) => (
          <div className="col" key={index}>
            <div className="card" key={index + 1000}>
              <p className="card-title" key={index + 2000}>
                {videoDetials.title}
              </p>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoDetials.url.slice(
                  32,
                  videoDetials.url.length
                )}`}
                title={videoDetials.title}
                key={index + 3000}
              ></iframe>
              <div className="card-body" key={index + 4000}>
                <div className="d-flex justify-content-between">
                  <LikeIcon increaseVote={increaseVote} indexElm={index} />
                  <div className="h4"> {videoDetials.rating}</div>
                  {/* <FavoriteBorderIcon sx={{fontSize: '3em'}} color="primary"><Typography>2</Typography></FavoriteBorderIcon> */}
                  <DislikeIcon decreaseVote={decreaseVote} indexElm={index} />
                </div>
                <DeleteButton deleteVideo={deleteVideo} indexElm={index} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCards;
