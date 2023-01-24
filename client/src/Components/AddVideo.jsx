import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";


const useStyles = makeStyles({
  customButton: {
    textTransform: "none",
    margin: "1rem",
  },
});

export default function AddVideo({ videosData, dataChange }) {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState("");

  const handleOnChange = (e) => {
    setUrl(e.target.value);
  };

  const validateUrl = (URL) => {
    const regex = new RegExp(
      "(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+"
    );
    return regex.test(URL);
  };

  const updateData = (video) => {
    videosData.push(video);
    videosData = [...videosData];
    dataChange(videosData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let video = {};
    const url = event.target.urlVideo.value;
    const title = event.target.titleVideo.value;

    if (url && title) {
      //generating random id with six digits
      //We can also find max Id and add one each time
      if (validateUrl(url)) {
        const arrayId = videosData.map((video) => parseInt(video.id));
        let id = arrayId[0];
        while (arrayId.includes(id)) {
          id = Math.floor(100000 + Math.random() * 900000);
        }
        video.id = id;
        video.title = title;
        video.url = url;
        video.rating = 0;
        const now = new Date()
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        video.date=date;
        video.time=time;
        updateData(video);
        alert("New Video has been added to you album");
        setShowForm(false);
      } else {
        alert("The URL is not Valid");
      }
    } else {
      alert("Title and url must not be empty");
    }
  };

  return (
    <div className="">
      <Button
        variant="contained"
        className={classes.customButton}
        onClick={() => setShowForm(true)}
      >
        Add Video
      </Button>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Title Video"
            variant="standard"
            name="titleVideo"
            sx={{ width: 0.3, mr: 3 }}
          />
          <TextField
            id="standard-basic"
            label="Url Video"
            name="urlVideo"
            variant="standard"
            sx={{ width: 0.3 }}
            value={url}
            onChange={handleOnChange}
          />
          <Button
            variant="contained"
            className={classes.customButton}
            type="submit"
          >
            {" "}
            Add
          </Button>
          <Button
            variant="contained"
            className={classes.customButton}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </form>
      ) : null}
    </div>
  );
}
