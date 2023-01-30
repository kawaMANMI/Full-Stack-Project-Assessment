import { React } from "react";
import Button from "@mui/material/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  customIcon: {
    color: "red",
  },
});

const fetchMyAPI = async (id) => {
  let response = await fetch(`https://kawa-full-stack-cyf.onrender.com/video/${id}`, {
    method: "delete",
  });
  response = await response.json();
  return response;
};

//The compenent for delete video, but before that, window command ma
export default function DeleteButton({ idToDelete, updateData }) {
  const classes = useStyles();
  // let [data, setData] = useState(null);
  // let [id, setId] = useState(null);

  const onClickDeleteHandler = async (id) => {
    if (window.confirm("Click OK to confirm the deletion")){
    const response = await fetchMyAPI(id);
    // console.log(response);
    updateData(response);
    }
  };

  return (
    <div className="d-flex justify-content-end align-items-end mt-5">
      <Button
        variant="outlined"
        startIcon={<DeleteForeverOutlinedIcon className={classes.customIcon} />}
        onClick={() => onClickDeleteHandler(idToDelete)}
      >
        Delete
      </Button>
    </div>
  );
}
