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
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
// core components
import Header from "../components/Headers/Header.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Category";
const Category = ({
  requestCategories,
  categories,
  currentPage,
  totalPages,
  location,
  isLoading,
}) => {
  const fetchCatagories = (page) => {
    requestCategories(page);
  };
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page")) || 0;
    fetchCatagories(page);
  }, []);
  return (
    <React.Fragment>
      <Header />
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Category</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Image
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                    <th scope="col" className="text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, i) => {
                    return (
                      <tr>
                        <td className="text-center">
                          <Media className="align-items-center">
                            <div className="avatar rounded-circle">
                              <img alt={cat.name} src={cat.imgUrl} />
                            </div>
                          </Media>
                        </td>
                        <td className="w-100">{cat.name}</td>
                        <td className="text-center">
                          <Button
                            className="btn-icon-only text-success"
                            role="button"
                            color=""
                            size=""
                          >
                            <i className="fas fa-pen"></i>
                          </Button>
                        </td>
                        <td className="text-center">
                          <Button
                            className="btn-icon-only text-danger"
                            role="button"
                            color=""
                            size=""
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={currentPage <= 0 && "disabled"}>
                      <PaginationLink
                        onClick={() => fetchCatagories(currentPage - 1)}
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
                          onClick={() => fetchCatagories(p)}
                        >
                          {p + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      className={currentPage >= totalPages - 1 && "disabled"}
                    >
                      <PaginationLink
                        onClick={() => fetchCatagories(currentPage + 1)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
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
  (state) => state.categories,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Category);
