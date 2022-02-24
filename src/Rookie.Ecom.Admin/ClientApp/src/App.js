import React from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Category from "./components/Category";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";

import CallbackPage from "./components/callback/CallbackPage";
import ProfilePage from "./components/profile/ProfilePage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        {/* <Route path="/category/:page?" element={<Category />} /> */}
        <Route path="/category/*" element={<Category />}>
          {/* <Route path=":page" element={<Category />} /> */}
        </Route>
        <Route path="/fetch-data/:startDateIndex?" element={<FetchData />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
