import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "formik-mui";
import * as Yup from "yup";

const UpdateProduct = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");
  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`).then((response) =>
      response.json().then((data) => setSelectedItem(data))
    );
  }, [id]);

  const productSchema = Yup.object().shape({
    productName: Yup.string()
      .min(2, "Too Short!")
      .required("Product name is Required"),
    quantity: Yup.number().required("Quantity is Required"),
    price: Yup.string().required("Price is Required"),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        productName: selectedItem && selectedItem.productName,
        quantity: selectedItem && selectedItem.quantity,
        price: selectedItem && selectedItem.price,
      }}
      validationSchema={productSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          if (selectedItem) {
            setSubmitting(false);
            values.updatedDate = new Date().toLocaleString();
            fetch(`http://localhost:4000/products/${id}`, {
              method: "PATCH",
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
          <Box sx={{ width: "70%" }} style={{ marginLeft: "15%" }} >
            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
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

export default UpdateProduct;
