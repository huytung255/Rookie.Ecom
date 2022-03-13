import React from "react";
import RequireAuth from "./components/RequireAuth";
import routes from "./routes";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Auth from "./layouts/Auth";
const App = () => {
  //   const requireAuth = (component) => ;
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.path === "/login")
        return (
          <Route
            exact
            path={prop.path}
            component={() => <Auth>{prop.component}</Auth>}
          />
        );
      if (prop.path === "/callback")
        return <Route exact path={prop.path} component={prop.component} />;
      return (
        <Route
          exact
          path={prop.path}
          component={() => <RequireAuth>{prop.component}</RequireAuth>}
        />
      );
    });
  };
  return (
    <BrowserRouter>
      {/* <Route path="" render={(props) => <Admin {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/callback" render={(props) => <CallbackPage {...props} />} />
      <Redirect from="/" to="/dashboard" />
      <Redirect from="*" to="/dashboard" /> */}
      <Switch>{getRoutes(routes)}</Switch>
    </BrowserRouter>
  );
};

export default App;
