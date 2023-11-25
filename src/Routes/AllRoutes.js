import { Routes, Route } from "react-router-dom";
import Products from "../Components/Products/Products";
import ViewProduct from "../Components/ViewProduct/ViewProduct";
import AddProduct from "../Components/AddProduct/AddProduct";
import UpdateProduct from "../Components/UpdateProduct/UpdateProduct";
import ChartView from "../Components/ChartView/ChartView";
import About from "../Components/About/About";
import ContactUs from "../Components/ContactUs/ContactUs";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import AccountManagement from "../Components/AccountManagement/AccountManagement";
import NotLoggedInPage from "../Components/NotLoggedInPage/NotLoggedInPage";

import { useSelector } from "react-redux";

const AllRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.login);
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/view-product/:id" element={isAuthenticated ? <ViewProduct /> : <NotLoggedInPage description="Looks like you are not logged in. To view product you need to Login." />} />
      <Route path="add-product" element={isAuthenticated ? <AddProduct /> : <NotLoggedInPage description="Looks like you are not logged in. To add product you need to Login." />} />
      <Route path="/update-product/:id" element={isAuthenticated ? <UpdateProduct /> : <NotLoggedInPage description="Looks like you are not logged in. To update product you need to Login." />} />
      <Route path="chart-view" element={isAuthenticated ? <ChartView /> : <NotLoggedInPage description="Looks like you are not logged in. To view most visited product you need to Login." />} />
      <Route path="my-profile" element={isAuthenticated ? <AccountManagement /> : <NotLoggedInPage description="Looks like you are not logged in. To view most visited product you need to Login." />} />

      <Route path="about" element={<About />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};
export default AllRoutes;
