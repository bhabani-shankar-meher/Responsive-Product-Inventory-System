import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetail: "",
  isAuthenticated: false,
  openInvalidUserAlert: false,
  openLoginAlert: false
};

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUserData: (state, action) => {
      try {
        state.userDetail = action.payload;
      } catch (exception) {
        console.log(exception);
      }
    },
    authenticationData: (state, action) => {
      try {
        state.isAuthenticated = action.payload;
      } catch (exception) {
        console.log(exception);
      }
    },
    invalidUserModal: (state, action) => {
      try {
        state.openInvalidUserAlert = action.payload;
      } catch (exception) {
        console.log(exception);
      }
    },
    loginUserModal: (state, action) => {
      try {
        state.openLoginAlert = action.payload;
      } catch (exception) {
        console.log(exception);
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { loginUserData, authenticationData, invalidUserModal, loginUserModal } = login.actions;

export default login.reducer;
