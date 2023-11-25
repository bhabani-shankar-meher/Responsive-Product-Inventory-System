import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
const ContactUs = () => {
    return (
        <Box sx={{ width: "80%", marginLeft: "10%" }} mt={5} mb={3}>
            <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={12} md={12}>
                    <Typography textAlign="center" variant="h4">
                        Contact Us
                    </Typography>
                    <Divider sx={{ width: "100%", marginTop: "20px" }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography textAlign="center" variant="h6">
                        If you have or issue or query please write mail to us <a href="mailto:bhabani.meher@wipro.com">bhabani.meher@wipro.com</a>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography textAlign="center" variant="h6">
                        Or you can reach out to us by dialing <a href="#">7606044523</a>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
export default ContactUs;