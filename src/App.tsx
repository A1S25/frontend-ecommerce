import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
/* import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; */
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound";


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []); 

  return (
  <Router >
    <Header />
    <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/product/:id" element={<ProductDetails />} />
           <Route path="/products" element={<Products />} />
           <Route path="/products/:keyword" element={<Products />} />
           <Route path="/search" element={<Search />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/about" element={<About />} />
           <Route path="/account" element={<Profile />} />
           <Route path="/me/update" element={<UpdateProfile />} />
           <Route path="/password/update" element={<UpdatePassword />} />
           <Route path="/password/forgot" element={<ForgotPassword />} />
           <Route path="/password/reset/:token" element={<ResetPassword />} />
           <Route path="/login" element={<LoginSignUp />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/shipping" element={<Shipping />} />
           <Route path="/success" element={<OrderSuccess />} />
           <Route path="/orders" element={<MyOrders />} />
           <Route path="/order/confirm" element={<ConfirmOrder />} />
           <Route path="/order/:id" element={<OrderDetails />} />
           <Route path="/admin/dashboard" element={<Dashboard />} />
           <Route path="/admin/products" element={<ProductList />} />
           <Route path="/admin/product" element={<NewProduct />} />
           <Route path="/admin/product/:id" element={<UpdateProduct />} />
           <Route path="/admin/orders" element={<OrderList />} />
           <Route path="/admin/order/:id" element={<ProcessOrder />} />
           <Route path="/admin/users" element={<UsersList />} />
           <Route path="/admin/user/:id" element={<UpdateUser />} />
           <Route path="/admin/reviews" element={<ProductReviews />} />
      </Routes>
      
  </Router>
  );
}

export default App;
