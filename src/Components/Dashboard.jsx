import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "react-select";
import { AuthContext } from "../Context/ContextStore";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80,
    display: "flex",
    margin: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(2),
    // padding: theme.spacing(2),
    justifyContent: "space-between",
  },
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
  card: {
    margin: 20,
    maxWidth: "100%",
    flex: "1 1 auto",
  },
}));

export default function DashBoard() {
  const {
    authState: { loggedUsers },
  } = useContext(AuthContext);
  const [dashData, setDashData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [adminData, setadminData] = useState();
  const [station, setStation] = useState();
  // const [id, setid] = useState();
  const classes = useStyles();
  const handleDeleteScheduled = (id) => {
    setRefresh(false);
    axios({
      method: "DELETE",
      url: `http://localhost:3000/scheduled/${id}`,
    });
  };
  let id = loggedUsers ? loggedUsers[0].id : 1;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}/scheduled`)
      .then((response) => {
        setRefresh(true);
        setDashData(
          response.data.map((data) => ({
            ...data,
            label: `${data.source?.name} to ${data.destination?.name}`,
            value: `${data.source?.name} to ${data.destination?.name}`,
          }))
        );
      });
  }, [refresh, id]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/scheduled")
      .then((response) => setadminData(response.data));
  }, []);
  const handleStationSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/stations", { name: station })
      .then((response) => response);
  };
  return loggedUsers?.length >= 0 ? (
    loggedUsers[0]?.role === "user" ? (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Select isSearchable="true" options={dashData} />
          <Grid container spacing={3}>
            {dashData?.length &&
              dashData.map((data) => (
                <Card className={classes.card}>
                  <Grid container item xs={12}>
                    <Grid item xs={6}>
                      <p className={classes.margin}>
                        From:<b>{data.source?.name}</b>
                      </p>
                      <p className={classes.margin}>
                        To:<b>{data.destination?.name}</b>
                      </p>
                      <p className={classes.margin}>
                        Date:{new Date(data.date).toDateString()}
                      </p>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        className={classes.button}
                        onClick={() => handleDeleteScheduled(data.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              ))}
          </Grid>
        </Grid>
      </div>
    ) : (
      <div className={classes.root}>
        <Grid item xs={12}>
          <form onSubmit={(e) => handleStationSubmit(e)}>
            <TextField
              variant="outlined"
              label="Add stations"
              onChange={(e) => setStation(e.target.value)}
            />
            <Button type="submit" className={classes.button}>
              Add Stations
            </Button>
          </form>
          {adminData?.length &&
            adminData?.map((data) => (
              <Card className={classes.card}>
                <Grid container item xs={12}>
                  <Grid item xs={6}>
                    <p className={classes.margin}>
                      From:<b>{data.source?.name}</b>
                    </p>
                    <p className={classes.margin}>
                      To:<b>{data.destination?.name}</b>
                    </p>
                    <p className={classes.margin}>
                      Date:{new Date(data.date).toDateString()}
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={classes.button}
                      onClick={() => handleDeleteScheduled(data.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
        </Grid>
      </div>
    )
  ) : (
    <div></div>
  );
}
