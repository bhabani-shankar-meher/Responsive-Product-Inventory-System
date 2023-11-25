import { Formik, Form, Field } from "formik";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const SignUp = () => {
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    emailID: Yup.string().email().required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Please Enter 8 char")
      .max(16, "Please use under 16"),
    againPassword: Yup.string()
      .required("Password is Required")
      .min(8, "Please Enter 8 char")
      .max(16, "Please use under 16")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    firstName: Yup.string().required("First name is Required"),
    lastName: Yup.string().required("Last is Required"),
    location: Yup.string().required("Location is Required"),
    mobile: Yup.string().required("Mobile No. is Required"),
  });

  return (
    <Formik
      initialValues={{
        emailID: "",
        password: "",
        againPassword: "",
        firstName: "",
        lastName: "",
        location: "",
        mobile: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          values.id = values.emailID;
          if (values) {
            fetch(`http://localhost:5000/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values, null, 2),
            });
            setSubmitting(false);
            navigate("/login", { replace: true });
          }
        } catch (exception) {
          console.log(exception);
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Box sx={{ width: "80%", marginLeft: "10%" }} mt={5} mb={3}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={12}>
                <Typography textAlign="center" variant="h4">
                  SignUp
                </Typography>
                <Divider sx={{ width: "100%", marginTop: "20px" }} />
              </Grid>
              <Grid item xs={12} md={12}>
                <Field
                  component={TextField}
                  name="emailID"
                  type="email"
                  label="Email"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="againPassword"
                  type="password"
                  label="Re-Password"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="firstName"
                  type="text"
                  label="First Name"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="lastName"
                  type="text"
                  label="Last Name"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="location"
                  type="text"
                  label="Location"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  name="mobile"
                  type="tel"
                  label="Mobile"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} md={12}>
            {isSubmitting && <CircularProgress />}
          </Grid>
          <Box sx={{ width: "80%", marginLeft: "10%" }}>
            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                SignUp
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginLeft: "5px" }}
                onClick={() => navigate("/", { replace: true })}
              >
                Back
              </Button>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
