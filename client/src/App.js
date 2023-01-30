import { React, useState, useEffect, useCallback } from "react";
import "./App.css";
//  import data from "./exampleresponse.json";
import Header from "./Components/Header";
import ToggleAscDesc from "./Components/ToggleAscDesc";
import VideoCards from "./Components/VideoCards";
import AddVideo from "./Components/AddVideo";
import Footer from "./Components/Footer";

function App() {
  const [data, setData] = useState([]);

  const fetchMyAPI = useCallback(async () => {
    let response = await fetch(
      "https://kawa-full-stack-cyf.onrender.com/videos/"
    );
    response = await response.json();
    setData(orderDataAccordingToVoteRate(response));
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  //Make data flexible and can be changed
  const orderDataAccordingToVoteRate = (data) => {
    data.sort((a, b) => b.rating - a.rating);
    data = [...data];
    return data;
  };

  const changeData = (data) => {
    // orderDataAccordingToVoteRate(data); //Live sorting after each change on data, resort again according to the rate
    const response =  fetchMyAPI();
    setData(data);
    // console.log(data)
  };
  return (
    <div className="App">
      <Header />
      <AddVideo videosData={data} changeData={changeData} />
      <ToggleAscDesc changeData={changeData} />
      <VideoCards videosData={data} changeData={changeData} />
      <Footer />
    </div>
  );
}

export default App;
