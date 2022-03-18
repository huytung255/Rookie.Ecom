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

// reactstrap components
import React from "react";

import { Button, Row, Col, Container } from "reactstrap";
import userManager from "../utils/userManager";
import { connect } from "react-redux";
const Login = () => {
  const onLoginButtonClick = (event) => {
    event.preventDefault();
    userManager.signinRedirect();
  };
  return (
    <Container>
      <div className="header-body text-center mb-7">
        <Row className="justify-content-center">
          <Col lg="5" md="6">
            <h1 className="text-white">Welcome!</h1>
            <p className="text-lead text-light">
              Please log in to access the admin dashboard.
            </p>
            <Button
              className="mt-3"
              color="primary"
              type="button"
              onClick={onLoginButtonClick}
            >
              Log in
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    isAuthenticated: state.oidc.user && !state.oidc.user.expired,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
