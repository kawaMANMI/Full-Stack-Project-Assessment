import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect, useCallback } from "react";

export default function ToggleAscDesc({ changeData }) {
  let [active, setActive] = useState(true);
  let [data, setData] = useState(null);
  let [query, setQuery] = useState("asc");

  const fetchMyAPI = useCallback(async () => {
    let response = await fetch(`https://kawa-full-stack-cyf.onrender.com/?order=${query}`);
    response = await response.json();
    setData(response);
  }, [query]);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  useEffect(() => {
    if (data) {
      changeData(data);
      setData(null);
    }
  }, [data, changeData]);

  const handleChange = () => {
    setActive(!active);
    active ? setQuery("asc") : setQuery("desc");
  };
  return (
    <ButtonGroup variant="contained" className="m-2">
      <Button disabled={!active} onClick={handleChange}>
        Asc
      </Button>
      <Button disabled={active} onClick={handleChange}>
        Desc
      </Button>
    </ButtonGroup>
  );
}
