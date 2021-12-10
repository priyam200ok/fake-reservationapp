import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
const theme = createTheme();
const useStyles = makeStyles(() => ({
  margin: {
    marginTop: 80,
  },
}));
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const RegisterSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(14, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  confirmPassword: Yup.string()
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match"),
    })
    .required("Required"),
});

export default function Register() {
  const classes = useStyles();
  const handleRegister = (data) => {
    axios
      .post("http://localhost:3000/users", data)
      .then((response) => response)
      .catch((e) => console.log(e));
  };
  let usersLength;
  axios
    .get("http://localhost:3000/users")
    .then((response) => (usersLength = response.data.length));
  console.log(usersLength && usersLength);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.margin}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                mobile: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                const obj = {
                  email: values.email,
                  password: values.password,
                  role: "user",
                };
                handleRegister(obj);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        error={touched.email && errors.email ? true : false}
                        fullWidth
                      >
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput
                          type="email"
                          value={values.email}
                          onChange={handleChange("email")}
                          onBlur={handleBlur("email")}
                          labelWidth={80}
                        />
                        <FormHelperText
                          error={touched.email && errors.email ? true : false}
                          id="email-helper-text"
                        >
                          {touched.email && errors.email ? errors.email : null}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        error={
                          touched.password && errors.password ? true : false
                        }
                        fullWidth
                      >
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                          type="password"
                          value={values.password}
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
                          labelWidth={80}
                        />
                        <FormHelperText
                          error={
                            touched.password && errors.password ? true : false
                          }
                          id="password-helper-text"
                        >
                          {touched.password && errors.password
                            ? errors.password
                            : null}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        required={errors.confirmPassword ? true : false}
                        fullWidth
                        error={
                          touched.confirmPassword && errors.confirmPassword
                            ? true
                            : false
                        }
                        variant="outlined"
                      >
                        <InputLabel>Confirm Password</InputLabel>
                        <OutlinedInput
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          onChange={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          value={values.confirmPassword}
                          labelWidth={140}
                        />
                        <FormHelperText
                          error={
                            touched.confirmPassword && errors.confirmPassword
                              ? true
                              : false
                          }
                          id="confirm-password-helper-text"
                        >
                          {touched.confirmPassword && errors.confirmPassword
                            ? errors.confirmPassword
                            : null}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        error={touched.mobile && errors.mobile ? true : false}
                        fullWidth
                        variant="outlined"
                      >
                        <InputLabel>Number</InputLabel>
                        <OutlinedInput
                          id="number"
                          label="Number"
                          name="mobile"
                          autoComplete="number"
                          onChange={handleChange("mobile")}
                          value={values.mobile}
                          helperText={errors.mobile}
                        />
                        <FormHelperText
                          error={touched.mobile && errors.mobile ? true : false}
                          id="mobile-helper-text"
                        >
                          {touched.mobile && errors.mobile
                            ? errors.mobile
                            : null}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link to="/signin" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
