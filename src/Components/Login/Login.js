import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { loginUserData, authenticationData, invalidUserModal } from "../../store/action/login";
import InvalidUser from "../Login/InvalidUser";

const Login = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const productSchema = Yup.object().shape({
        emailID: Yup.string().email().required("Email is Required"),
        password: Yup.string()
            .required("Password is Required")
            .min(8, "Please Enter 8 char")
            .max(16, "Please use under 16"),
    });

    return (
        <Box sx={{ width: "100%" }} ml={1}>
            <InvalidUser />
            <Formik
                initialValues={{
                    emailID: "",
                    password: "",
                }}
                validationSchema={productSchema}
                onSubmit={(values, { setSubmitting }) => {
                    try {
                        if (values) {
                            fetch(`http://localhost:5000/login/${values.emailID}`)
                                .then((response) => response.json())
                                .then((data) => {
                                    if (
                                        values.emailID === data.emailID &&
                                        values.password === data.password
                                    ) {
                                        setSubmitting(false);
                                        dispatch(loginUserData(data));
                                        dispatch(authenticationData(true));
                                        navigate("/", { replace: true });
                                    } else {
                                        setSubmitting(false);
                                        dispatch(authenticationData(false));
                                        dispatch(invalidUserModal(true));
                                    }
                                });
                        }
                    } catch (exception) {
                        console.log(exception);
                    }
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Box sx={{ width: "50%" }} mt={5} mb={3} style={{ marginLeft: "25%" }}>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={12} md={12}>
                                    <Typography textAlign="center" variant="h4">
                                        LogIn
                                    </Typography>
                                    <Divider sx={{ width: "100%", marginTop: "20px" }} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {!isAuthenticated && <InvalidUser />}
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
                                <Grid item xs={12} md={12}>
                                    <Field
                                        component={TextField}
                                        name="password"
                                        type="password"
                                        label="Password"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ width: "50%" }} style={{ marginLeft: "25%" }}>
                            <Grid item xs={12} md={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Login
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
        </Box>
    );
};

export default Login;
