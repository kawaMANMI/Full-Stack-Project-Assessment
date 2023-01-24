import React from "react";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { makeStyles } from "@material-ui/core/styles";

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
