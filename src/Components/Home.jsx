import React, { useContext } from "react";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@material-ui/core";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";

import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { AuthContext } from "../Context/ContextStore";
import { LOGGED_OUT } from "../Context/ContextReducer";
import PlanJourney from "./PlanJourney";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    justifyContent: "space-between",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    color: "#fff",
  },
}));
export default function Home() {
  const history = useHistory();
  const classes = useStyles();
  const {
    authState: { signedIn, loggedUsers },
    authDispatch,
  } = useContext(AuthContext);
  const location = useLocation();
  return signedIn ? (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.appBar}>
          <Typography variant="h6" noWrap>
            FakeReservations
          </Typography>
          <Typography>
            {location.pathname.split("/")[1].toLocaleUpperCase()}
          </Typography>
          <Typography>
            Welcome {loggedUsers?.length >= 0 ? loggedUsers[0].email : null}
          </Typography>
          <Box>
            <Button
              className={classes.button}
              onClick={() => {
                authDispatch({
                  type: LOGGED_OUT,
                });
                history.push("/signin");
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => history.push("/planjourney")}>
              <ListItemText primary="Plan Journey" />
            </ListItem>
            <ListItem button onClick={() => history.push("/dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Switch>
        <Route path="/planjourney">
          {loggedUsers[0]?.role === "admin" ? (
            <Redirect to="/dashboard">
              <Dashboard />
            </Redirect>
          ) : (
            <PlanJourney />
          )}
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  ) : (
    <div className={classes.root}>
      <SignIn />
    </div>
  );
}
