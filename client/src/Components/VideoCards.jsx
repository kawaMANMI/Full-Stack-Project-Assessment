import React from "react";
import DislikeIcon from "./DislikeIcon";
import LikeIcon from "./LikeIcon";
import "../App.css";
import DeleteButton from "./DeleteButton";
// import { useState } from 'react';

//This compnenet the Crads of the videos including, detials of the videos and voting (Like ) options.]
//Have not got time yest to fully staisfy the style and css.
//But the functionality for like and dislike, adding video, deleting video is working fine.

const LikeDislikeToDataBase = async (dataToSend) => {
  let response = await fetch(
    `https://kawa-full-stack-cyf.onrender.com/video/likedislike/${dataToSend.id}/${dataToSend.type}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    }
  );
   response = await response.json();
  return response;
};

const VideoCards = ({ videosData, changeData }) => {

  const increaseVote = async (index) => {
    const dataToSend = { id: videosData[index].id, type: 1 };
    const response = await LikeDislikeToDataBase(dataToSend);
    if (response === "updated") {
      alert("Vote has been update");
      videosData[index].rating++;
      videosData = [...videosData];
      changeData(videosData);
    } else {
      alert("Failure in updating vote ");
    }
  };

  const decreaseVote =async (index) => {
    const dataToSend = { id: videosData[index].id, type: -1 };
    const response = await LikeDislikeToDataBase(dataToSend);
    if (response === "updated") {
      alert("Vote has been update");
      videosData[index].rating--;
      videosData = [...videosData];
      changeData(videosData);
    } else {
      alert("Failure in updating vote ");
    }

  };

  //const deleteVideo = (index) => {
  //   if (window.confirm("Click OK to confirm the deletion")) {
  //     const filterVideos = videosData.filter(
  //       (video, videoIndex) => videoIndex !== index
  //     );
  //     videosData = [...filterVideos];
  //     dataChange(videosData);
  //   }
  // };
  const updateData = (data) => {
    changeData(data);
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
                  <DislikeIcon decreaseVote={decreaseVote} indexElm={index} />
                </div>
                {/* This has been done only as front end without connecting to the server */}
                {/* <DeleteButton deleteVideo={deleteVideo} indexElm={index} />    */}

                {/*Deleteing in the server */}
                <DeleteButton
                  idToDelete={videoDetials.id}
                  updateData={updateData}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCards;
