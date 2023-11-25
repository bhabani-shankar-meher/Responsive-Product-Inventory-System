import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { AgGridReact } from "ag-grid-react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { getProductsListFetchAPI, deleteProductModal, getProductDetails } from "../../store/action/getProduct";
import { loginUserModal } from "../../store/action/login";

import DeleteAlert from "./DeleteAlert/DeleteAlert";
import SearchProduct from "./SearchProduct/SearchProduct";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import classes from "./Products.module.css";

const Products = () => {
    const navigate = useNavigate();
    const gridRef = useRef();
    const dispatch = useDispatch();
    const { productsList } = useSelector((state) => state.getproduct);
    const { isAuthenticated } = useSelector((state) => state.login);


    const [columnDefs] = useState([
        {
            width: 60,
            valueFormatter: (params) => {
                return `${parseInt(params.node.id) + 1}`;
            },
            sortable: false,
            pinned: "left",
            lockPinned: true,
        },
        {
            headerName: "Product Name",
            field: "productName",
            cellRenderer: (value) => {
                return (
                    <Link
                        // onClick={!isAuthenticated && { dispatch(openLoginAlert(true))}}
                        to={isAuthenticated ? `/view-product/${value.data.id}` : "/"}
                        style={{ textDecoration: "none" }}
                    >
                        {value.data.productName}
                    </Link>
                );
            },

        },
        {
            headerName: "Quantity",
            width: 110,
            field: "quantity",
        },
        {
            headerName: "Price",
            width: 110,
            field: "price"
        },
        { headerName: "Created Date", field: "createdDate" },
        { headerName: "Updated Date", field: "updatedDate" },
        {
            width: 100,
            cellRenderer: (value) => {
                return (
                    <span className={classes.delete_icon}>
                        <AiFillDelete onClick={() => {
                            if (isAuthenticated) {
                                dispatch(deleteProductModal(true));
                                dispatch(getProductDetails(value));
                            } else {
                                dispatch(loginUserModal(true));
                            }

                        }} />
                    </span>
                );
            },
            colId: "deleteproduct",
            editable: false,
            sortable: false,
            resizable: false,
        },
        {
            width: 100,
            cellRenderer: (value) => {
                return (
                    <span className={classes.edit_icon}>
                        <AiFillEdit onClick={() => {
                            if (isAuthenticated) {
                                navigate(`/update-product/${value.data.id}`, { replace: true });
                            } else {
                                dispatch(loginUserModal(true));
                            }
                        }} />
                    </span>
                );
            },
            colId: "updateproduct",
            editable: false,
            sortable: false,
            resizable: false,
        },
    ]);

    useEffect(() => {
        fetch("http://localhost:4000/products")
            .then((response) => response.json())
            .then((data) => dispatch(getProductsListFetchAPI(data)));
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            resizable: true,
            suppressPaginationPanel: true,
            suppressScrollOnNewData: true,
            animateRows: true,
            suppressColumnMoveAnimation: true,
        };
    }, []);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            document.getElementById("search-product").value
        );
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <DeleteAlert />
            <SearchProduct id="search-product" onInput={onFilterTextBoxChanged} />
            <Box className="ag-theme-alpine" sx={{ width: "100%" }}>
                <AgGridReact
                    ref={gridRef}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowData={productsList}
                    suppressDragLeaveHidesColumns={true}
                    pagination={true}
                    paginationPageSize={10}
                    force={true}
                    suppressFlash={true}
                    rowSelection={"single"}
                    suppressAggFuncInHeader={true}
                    animateRows={true}
                    domLayout={"autoHeight"}
                    suppressSizeToFit={true}
                ></AgGridReact>
            </Box>
        </Box>
    );
};
export default Products;