import React from "react";
import { Redirect } from "react-router-dom";
import Admin from "../../layouts/Admin";
import { connect } from "react-redux";
function RequireAuth({ children, user }) {
  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Admin>{children}</Admin>;
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(RequireAuth);
