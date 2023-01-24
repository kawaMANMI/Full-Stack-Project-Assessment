import React from "react";
import Button from "@mui/material/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  customIcon: {
    color: "red",
  },
});


//The compenent for delete video, but before that, window command ma
export default function DeleteButton({ deleteVideo, indexElm }) {
  const classes = useStyles();

  return (
    <div className="d-flex justify-content-end align-items-end mt-5">
      <Button
        variant="outlined"
        startIcon={<DeleteForeverOutlinedIcon className={classes.customIcon} />}
        onClick={() => deleteVideo(indexElm)}
      >
        Delete
      </Button>
    </div>
  );
}
