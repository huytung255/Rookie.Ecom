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
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Product";
import EmptyHeader from "../components/Headers/EmptyHeader.js";
import NewCategoryModal from "../components/Modals/NewCategoryModal";
import DeleteCategoryModal from "../components/Modals/DeleteCategoryModal";
import NewProductModal from "../components/Modals/NewProductModal";
const Product = ({
  requestProducts,
  products,
  currentPage,
  totalPages,
  location,
  isLoading,
}) => {
  const fetchProducts = (page) => {
    requestProducts(page);
  };
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page")) || 0;
    fetchProducts(page);
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
                    <h3 className="mb-0">Product</h3>
                  </div>
                  <div className="col text-right">
                    <NewProductModal />
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Image
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                    <th scope="col" className="text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => {
                    return (
                      <tr key={i}>
                        <td className="text-center">
                          <Media className="align-items-center">
                            <div className="">
                              <img
                                className="img-fluid"
                                alt={p.name}
                                src={
                                  p.productImages.length !== 0 &&
                                  p.productImages[0].imageUrl
                                }
                              />
                            </div>
                          </Media>
                        </td>
                        <td className="w-100">{p.name}</td>
                        <td className="w-100">{p.price}</td>
                        <td className="w-100">
                          {p.category && p.category.name}
                        </td>
                        <td className="text-center">
                          <Button
                            className="btn-icon-only text-success"
                            role="button"
                            tag={NavLink}
                            to={`/product/${p.id}`}
                            color=""
                          >
                            <i className="fas fa-pen"></i>
                          </Button>
                        </td>
                        <td className="text-center"></td>
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
                        onClick={() => fetchProducts(currentPage - 1)}
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
                          onClick={() => fetchProducts(p)}
                        >
                          {p + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      className={currentPage >= totalPages - 1 && "disabled"}
                    >
                      <PaginationLink
                        onClick={() => fetchProducts(currentPage + 1)}
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
  (state) => state.products,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Product);
