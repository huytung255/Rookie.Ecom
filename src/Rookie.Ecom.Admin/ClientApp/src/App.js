import React from "react";
import routes from "./routes";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Category from "./components/Category";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";

import CallbackPage from "./components/callback/CallbackPage";
import ProfilePage from "./components/profile/ProfilePage";

import { Route } from "react-router-dom";
export default () => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            // path={prop.layout + prop.path}
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <Layout>
      {getRoutes(routes)}
      {/* <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/category/:page?" component={Category} />
      <Route path="/fetch-data/:startDateIndex?" component={FetchData} />

      <Route path="/profile" component={ProfilePage} />
      <Route path="/callback" component={CallbackPage} /> */}
    </Layout>
  );
};
