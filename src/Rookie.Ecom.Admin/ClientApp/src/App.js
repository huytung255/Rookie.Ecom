import React from "react";
import RequireAuth from "./components/auth/RequireAuth";
import routes from "./routes";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import RequireLogout from "./components/auth/RequireLogout";
const App = () => {
  //   const requireAuth = (component) => ;
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.path === "/login")
        return (
          <Route
            exact
            path={prop.path}
            component={() => <RequireLogout>{prop.component}</RequireLogout>}
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
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
