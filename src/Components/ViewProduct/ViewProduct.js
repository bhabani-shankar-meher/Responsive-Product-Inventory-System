import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
const ViewProduct = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");
  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`).then((response) =>
      response.json().then((data) => setSelectedItem(data))
    );
  }, [id]);

  useEffect(() => {
    selectedItem &&
      (selectedItem.noOfClicked = selectedItem.noOfClicked + 1);
    selectedItem &&
      fetch(`http://localhost:4000/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      });
  }, [selectedItem]);

  return (
    <Box sx={{ width: "50%", marginLeft: "25%" }}>
      <Grid item xs={12} md={12} style={{ boxShadow: "5px 5px 15px -1px rgb(0 0 0 / 22%)", background: "white", marginTop: "2rem" }}>
        <List sx={{ width: "100%" }}>
          {selectedItem && (
            <ListItem alignItems="center">
              <ListItemText
                style={{ textAlign: "center" }}
                primary={`Product Name : ${selectedItem.productName}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "block" }}
                      mt={2}
                      component="h6"
                      variant="h6"
                      color="text.primary"
                    >
                      {`Quantity : ${selectedItem.quantity}`}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      mt={2}
                      variant="p"
                      color="text.primary"
                    >
                      {`Price : ${selectedItem.price}`}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      mt={2}
                      variant="p"
                      color="text.primary"
                    >
                      {`Created Date : ${selectedItem.createdDate}`}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      mt={2}
                      variant="p"
                      color="text.primary"
                    >
                      {`Updated Date : ${selectedItem.updatedDate}`}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      mt={2}
                      variant="p"
                      color="text.primary"
                    >
                      {`Viewed : ${selectedItem.noOfClicked}`}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          )}
        </List>
        <Grid item xs={12} md={12} mt={5} style={{ display: "flex", justifyContent: "center", paddingBottom: "2rem" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "10rem" }}
            onClick={() => { navigate(`/update-product/${selectedItem.id}`, { replace: true }) }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ width: "10rem", marginLeft: "2rem" }}
            onClick={() => navigate("/", { replace: true })}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewProduct;
