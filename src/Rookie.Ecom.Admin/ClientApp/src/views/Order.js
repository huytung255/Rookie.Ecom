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
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
// core components
import { NavLink, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Order";
import EmptyHeader from "../components/Headers/EmptyHeader.js";
const Order = ({
  requestOrders,
  orders,
  currentPage,
  totalPages,
  isLoading,
}) => {
  const location = useLocation();
  const fetchOrders = (page) => {
    requestOrders(page);
  };
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page")) || 0;
    fetchOrders(page);
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
                    <h3 className="mb-0">Order</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    <th scope="col" className="text-center">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          {new Date(order.createdDate).toDateString() +
                            " " +
                            new Date(order.createdDate).toLocaleTimeString()}
                        </td>
                        <td>{order.user.fullName}</td>
                        <td>{order.status}</td>
                        <td>{order.total}</td>
                        <td className="text-center">
                          <Button
                            className="btn-icon-only text-success"
                            role="button"
                            tag={NavLink}
                            to={`/order/${order.id}`}
                            color=""
                          >
                            <i className="fas fa-pen"></i>
                          </Button>
                        </td>
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
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={currentPage <= 0 && "disabled"}>
                      <PaginationLink
                        onClick={() => fetchOrders(currentPage - 1)}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {Array.from(Array(totalPages).keys()).map((p, i) => (
                      <PaginationItem
                        key={p}
                        className={currentPage === p && "active"}
                      >
                        <PaginationLink
                          // href="#pablo"
                          onClick={() => fetchOrders(p)}
                        >
                          {p + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      className={currentPage >= totalPages - 1 && "disabled"}
                    >
                      <PaginationLink
                        onClick={() => fetchOrders(currentPage + 1)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default connect(
  (state) => state.orders,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Order);
