import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import { push } from "react-router-redux";
import { useHistory } from "react-router-dom";
import userManager from "../../utils/userManager";

const CallbackPage = () => {
  const history = useHistory();
  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={() => history.push("/admin/dashboard")}
      errorCallback={(error) => {
        history.push("/");
        console.error(error);
      }}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
};

export default connect()(CallbackPage);
