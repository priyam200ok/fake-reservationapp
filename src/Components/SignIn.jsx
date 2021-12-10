import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../Context/ContextStore";
import { LOGGED_IN, LOGGED_USER } from "../Context/ContextReducer";
// import { Formik, Form, Field } from "formik";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(14, "Too Long!")
    .required("Required"),
});
export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState();
  const {
    authState: { loggedUsers },
    authDispatch,
  } = useContext(AuthContext);
  const handleLogin = (values) => {
    axios
      .get(`http://localhost:3000/users?q=${values.email}&q=${values.password}`)
      .then((response) => setData(response.data));
    authDispatch({
      type: LOGGED_USER,
      loggedUsers: data,
    });
    loggedUsers?.length > 0
      ? authDispatch({
          type: LOGGED_IN,
        })
      : history.push("/signin");
    loggedUsers[0].role === "admin"
      ? history.push("/")
      : history.push("/planjourney");
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            isValid,
            isSubmitting,
          }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!isValid}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/register" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button>
                    <Link to="/register">REGISTER</Link>
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
