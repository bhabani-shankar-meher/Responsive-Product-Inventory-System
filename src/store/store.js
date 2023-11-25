import { configureStore } from "@reduxjs/toolkit";
import getProductReducer from "./action/getProduct";
import loginUserData from "./action/login";

export default configureStore({
  reducer: {
    getproduct: getProductReducer,
    login: loginUserData,
  },
});
