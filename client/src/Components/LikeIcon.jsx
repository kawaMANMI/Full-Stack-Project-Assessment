import React from "react";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { makeStyles } from "@material-ui/core/styles";


//This component for adding like (one ) for the vote rate.
// I wihs if I got time at the end of all essential tasks,
 //add some more style css, like adding heart shape for rating 
 //and this can  be animate or have different colours accoding to the rate value
 // I would like also one day make it a use can only vote once base to the port number (or user name) how ? I don't know for now
 //disable and enable like and dislike comments also can be work on it hopefully at some point
const useStyles = makeStyles({
  customButton: {
    color: "red",
    borderRadius: 98,
  },
});

export default function LikeIcon({ increaseVote, indexElm }) {
  const classes = useStyles();

  return (
    <div>
      <Button
        startIcon={<ThumbUpOffAltIcon className={classes.customButton} />}
        color="secondary"
        disabled={false}
        size="large"
        variant="outlined"
        className={classes.customButton}
        onClick={() => {
          increaseVote(indexElm);
        }}
      >
        Like
      </Button>
    </div>
  );
}
