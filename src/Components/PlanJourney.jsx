import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import Select from "react-select";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../Context/ContextStore";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 40,
    paddingInline: 40,
  },
  root: { marginTop: "160px" },
  button: {
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "black",
    maxWidth: "200px",
    height: "60px",
    "&:hover": {
      backgroundColor: "#3f51b5",
      color: "#fff",
    },
  },
  select: {
    maxWidth: 200,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  border: {
    border: "1 px solid black",
  },
}));

export default function PlanJourney() {
  const {
    authState: { loggedUsers },
  } = useContext(AuthContext);
  const [from, SetFrom] = useState();
  const [to, SetTo] = useState();
  const [getStation, setGetStation] = useState();
  const [depDate, setDepDate] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    axios
      .get("http://localhost:3000/stations")
      .then((response) =>
        setGetStation(
          response.data.map((data) => ({
            ...data,
            label: data.name,
            value: data.name,
          }))
        )
      )
      .catch((err) => console.log(err.response));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let id = loggedUsers ? loggedUsers[0].id : undefined;
    axios
      .post(`http://localhost:3000/users/${id}/scheduled`, {
        source: from,
        destination: to,
        date: depDate,
        userId: id,
      })
      .then((response) => response)
      .catch((e) => console.error(e));
  };
  const onDateChange = (date) => {
    setDepDate(date);
  };
  function onFocusChange({ focused }) {
    setIsFocused(focused);
  }
  return (
    <Grid item xs={10} className={classes.root}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={4} md={4}>
          <Select
            styles={classes.select}
            onChange={(e) => SetFrom(e)}
            isSearchable="true"
            options={getStation}
          />
        </Grid>
        <Grid item xs={4} md={4}>
          <Select
            styles={classes.select}
            onChange={(e) => SetTo(e)}
            isSearchable="true"
            options={getStation}
          />
        </Grid>
        <Grid item xs={4} md={4} className={classes.border}>
          <SingleDatePicker
            id="date_input"
            date={depDate}
            focused={isFocused}
            onDateChange={onDateChange}
            onFocusChange={onFocusChange}
            noBorder={true}
          />
        </Grid>
        <Grid item xs={3} justifyContent="center">
          <Button onClick={(e) => handleSubmit(e)} className={classes.button}>
            Schedule Journey
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
