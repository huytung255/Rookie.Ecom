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
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import routes from "../routes";
import { connect } from "react-redux";
import brandImg from "../assets/img/brand/argon-react.png";
const Admin = (props) => {
  const history = useHistory();
  const { children, ...rest } = props;
  const mainContent = React.useRef(null);
  // const location = useLocation();

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  const getBrandText = (path) => {
    // for (let i = 0; i < routes.length; i++) {
    //   if (
    //     props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
    //     -1
    //   ) {
    //     return routes[i].name;
    //   }
    // }
    // return "Brand";
    return "Brand";
  };
  return (
    <React.Fragment>
      <Sidebar
        {...rest}
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: brandImg,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar {...rest} brandText={getBrandText} />
        {/* <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard" />
        </Switch> */}
        {children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(Admin);
