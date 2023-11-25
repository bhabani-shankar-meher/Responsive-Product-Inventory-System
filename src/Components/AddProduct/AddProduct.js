import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const productSchema = Yup.object().shape({
        productName: Yup.string()
            .min(2, "Too Short!")
            .required("Product name is Required"),
        quantity: Yup.number().required("Quantity is Required"),
        price: Yup.string().required("Price is Required"),
    });
    return (
        <Formik
            initialValues={{
                productName: "",
                quantity: "",
                price: "",
            }}
            validationSchema={productSchema}
            onSubmit={(values, { setSubmitting }) => {
                try {
                    if (values) {
                        setSubmitting(false);
                        values.id = uuidv4();
                        values.noOfClicked = 0;
                        values.createdDate = new Date().toLocaleString();
                        values.updatedDate = "Not Update Yet";
                        fetch(`http://localhost:4000/products`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values, null, 2),
                        });
                        navigate("/", { replace: true });
                    }
                } catch (exception) {
                    console.log(exception);
                }
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <Box sx={{ width: "70%" }} mt={5} mb={3} style={{ marginLeft: "15%" }}>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item xs={12} md={12}>
                                <Field
                                    component={TextField}
                                    name="productName"
                                    type="text"
                                    label="Product Name"
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Field
                                    component={TextField}
                                    name="quantity"
                                    type="number"
                                    label="Quantity"
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Field
                                    component={TextField}
                                    name="price"
                                    type="text"
                                    label="Price (INR)"
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid item xs={12} md={12}>
                        {isSubmitting && <CircularProgress />}
                    </Grid>
                    <Box sx={{ width: "70%" }} style={{ marginLeft: "15%" }}>
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default AddProduct;
