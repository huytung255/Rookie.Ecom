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
import React, { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Profile";
import EmptyHeader from "../components/Headers/EmptyHeader.js";
const UserList = ({ profileList, isLoading, requestProfileList }) => {
  useEffect(() => {
    requestProfileList();
  }, []);
  return (
    <React.Fragment>
      <EmptyHeader />
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Users</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Full name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Date of birth</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {profileList.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td className="w-100">{user.fullName}</td>
                        <td className="w-100">{user.email}</td>
                        <td className="w-100">{user.phoneNumber}</td>
                        <td className="w-100">{user.dob}</td>
                        <td className="w-100">{user.userAddress}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {isLoading && (
                <CardFooter className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default connect(
  (state) => state.profile,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(UserList);
