
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const NotLoggedInPage = (props) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ width: "70%" }} mt={5} mb={3} style={{ marginLeft: "15%" }}>
            <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={12} md={12}>
                    <Typography textAlign="center" variant="h4">
                        Not Logged In
                    </Typography>
                    <Divider sx={{ width: "100%", marginTop: "20px" }} />
                    <Typography textAlign="center" variant="h6">
                        {props.description}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} mt={5} style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "10rem" }}
                        onClick={() => { navigate("/login", { replace: true }) }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        style={{ width: "10rem", marginLeft: "2rem" }}
                        onClick={() => navigate("/signup", { replace: true })}
                    >
                        Signup
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
export default NotLoggedInPage;