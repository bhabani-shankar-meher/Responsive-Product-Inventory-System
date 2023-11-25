import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: null,
  openDeleteAlertModal: false,
  productDetails: null,
};
const deleteProductById = (id) => {
  fetch(`http://localhost:4000/products/${id}`, {
    method: "DELETE",
  });
};

export const getProductList = createSlice({
  name: "getproduct",
  initialState,
  reducers: {
    getProductsListFetchAPI: (state, action) => {
      try {
        state.productsList = action.payload;
      } catch (exceptiion) {
        console.log(exceptiion);
      }
    },
    deleteProductAPI: (state, action) => {
      try {
        deleteProductById(action.payload);
      } catch (err) {
        console.log(err);
      }
    },
    getProductDetails: (state, action) => {
      try {
        state.productDetails = action.payload;
      } catch (exceptiion) {
        console.log(exceptiion);
      }
    },
    deleteProductModal: (state, action) => {
      try {
        state.openDeleteAlertModal = action.payload;
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const {
  getProductsListFetchAPI,
  deleteProductAPI,
  deleteProductModal,
  getProductDetails,
} = getProductList.actions;

export default getProductList.reducer;
