import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Category from "./components/Category";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";

import CallbackPage from "./components/callback/CallbackPage";
import ProfilePage from "./components/profile/ProfilePage";
import Admin from "./layouts/Admin";
import Index from "./views/Index";

export default () => <Admin />;
