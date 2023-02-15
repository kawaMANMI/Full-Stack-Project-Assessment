import React from "react";
import Button from "@mui/material/Button";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  customButton: {
    color: "red",
    borderRadius: 98,
  },
});

export default function DislikeIcon({ decreaseVote, indexElm }) {
  const classes = useStyles();
  return (
    <div>
      <Button
        startIcon={<ThumbDownOffAltIcon className={classes.customButton} />}
        color="secondary"
        disabled={false}
        size="large"
        variant="outlined"
        className={classes.customButton}
        onClick={() => {
          decreaseVote(indexElm);
        }}
      >
        Dislike
      </Button>
    </div>
  );
}
