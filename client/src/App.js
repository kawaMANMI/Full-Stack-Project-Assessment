import {React, useState} from "react";
import "./App.css";
import data from "./exampleresponse.json";
import Header from "./Components/Header";
import VideoCards from "./Components/VideoCards";
import AddVideo from "./Components/AddVideo";


function App() {


  //Make data flxible and can be changed
  let  [videosData, setVideosData]=useState(data);

  const changeData=(data)=>{
    setVideosData(data)
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
