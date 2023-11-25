import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import { getProductsListFetchAPI } from "../../store/action/getProduct";

// import classes from "./ChartView.module.css";
const ChartView = () => {
    const dispatch = useDispatch();
    const { productsList } = useSelector((state) => state.getproduct);
    useEffect(() => {
        fetch("http://localhost:4000/products")
            .then((response) => response.json())
            .then((data) => dispatch(getProductsListFetchAPI(data)));
    }, []);

    const chartData = {
        labels: productsList && productsList.map((data) => data.productName),
        datasets: [
            {
                data: productsList && productsList.map((data) => data.noOfClicked),
                backgroundColor: [
                    '#0d6efd',
                ],
                borderColor: [
                    '#0d6efd',
                ],
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    };
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip
    );


    return (
        <Box sx={{ width: "70%", marginLeft: "15%", height: "30rem" }} mt={2} mb={3}>
            <Grid item xs={12} md={12}>
                <Typography marginBottom={"2rem"} textAlign="center" variant="h6">
                    VISUALIZATION OF VIEWED PRODUCTS
                </Typography>
            </Grid>
            <Bar options={options} data={chartData} />
        </Box>
    );
};
export default ChartView;