import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { authenticationData, loginUserData } from "../../store/action/login"

const AccountManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userDetail } = useSelector((state) => state.login);
    const [profileData, setProfileData] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/login/${userDetail.emailID}`).then((response) =>
            response.json().then((data) => setProfileData(data))
        );
    }, [userDetail.emailID]);

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
            enableReinitialize={true}
            initialValues={{
                emailID: profileData && profileData.emailID,
                password: profileData && profileData.password,
                againPassword: profileData && profileData.againPassword,
                firstName: profileData && profileData.firstName,
                lastName: profileData && profileData.lastName,
                location: profileData && profileData.location,
                mobile: profileData && profileData.mobile,
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
                try {
                    values.id = values.emailID;
                    if (profileData) {
                        fetch(`http://localhost:5000/login/${values.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values, null, 2),
                        })
                        .then((response)=>response.json())
                        .then((data)=>{
                            dispatch(loginUserData(data));
                            dispatch(authenticationData(true));
                        });
                        setSubmitting(false);
                        
                        navigate("/", { replace: true });
                    }
                } catch (exception) {
                    console.log(exception);
                }
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <Box sx={{ width: "80%" }} mt={5} mb={3} style={{ marginLeft: "10%" }}>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item xs={12} md={12}>
                                <Typography textAlign="center" variant="h4">
                                    Account Management
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
                    <Box sx={{ width: "80%" }} style={{ marginLeft: "10%" }}>
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Update
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

export default AccountManagement;
