/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Index from "./views/Index";
import Profile from "./views/Profile.js";
import Category from "./views/Category";
import CategoryDetail from "./views/CategoryDetail";
import Product from "./views/Product";
import ProductDetail from "./views/ProductDetail";
import CallbackPage from "./components/callback/CallbackPage";
import Login from "./views/Login.js";
import UserList from "./views/UserList";
import Order from "./views/Order";
import OrderDetail from "./views/OrderDetail";
var routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    listed: true,
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-archive-2 text-primary",
    component: <Category />,
    listed: true,
  },
  {
    path: "/category/:id",
    name: "Category Detail",
    icon: "ni ni-archive-2 text-primary",
    component: <CategoryDetail />,
    listed: false,
  },
  {
    path: "/product",
    name: "Product",
    icon: "ni ni-basket text-primary",
    component: <Product />,
    listed: true,
  },
  {
    path: "/product/:id",
    name: "Product Detail",
    icon: "ni ni-basket text-primary",
    component: <ProductDetail />,
    listed: false,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "",
    component: <Profile />,
    listed: false,
  },
  {
    path: "/user-list",
    name: "User List",
    icon: "ni ni-single-02 text-primary",
    component: <UserList />,
    listed: true,
  },
  {
    path: "/order",
    name: "Order",
    icon: "ni ni-cart text-primary",
    component: <Order />,
    listed: true,
  },
  {
    path: "/order/:id",
    name: "Order Detail",
    icon: "ni ni-cart text-primary",
    component: <OrderDetail />,
    listed: false,
  },
  {
    path: "/login",
    name: "Test",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    listed: false,
  },
  {
    path: "/callback",
    name: "Callback",
    icon: "",
    component: CallbackPage,
    listed: false,
  },
];
export default routes;
