import {React, useState} from "react";
import "./App.css";
import data from "./exampleresponse.json";
import Header from "./Components/Header";
import VideoCards from "./Components/VideoCards";
import AddVideo from "./Components/AddVideo";


function App() {


  //Make data flexible and can be changed
  const orderDataAccordingToVoteRate=(data)=>{
    data.sort((a,b) => b.rating - a.rating);
    data=[...data];
    return data;
  }
  let  [videosData, setVideosData]=useState(orderDataAccordingToVoteRate(data));

  
  const changeData=(data)=>{
    orderDataAccordingToVoteRate(data); //Live sorting after each change on data, resort again according to the rate
    setVideosData(data);
    console.log(data)
    }
  return (
    <div className="App">
<Header/>
<AddVideo videosData={videosData}  dataChange={changeData}/>
<VideoCards videosData={videosData}  dataChange={changeData}/>
    </div>
  );
}

export default App;
