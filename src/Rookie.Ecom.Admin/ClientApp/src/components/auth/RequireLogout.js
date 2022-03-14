import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import Auth from "../../layouts/Auth";
import { connect } from "react-redux";
function RequireAuth({ children, user }) {
  if (user) {
    return <Redirect to="/" />;
  }

  return <Auth>{children}</Auth>;
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(RequireAuth);
