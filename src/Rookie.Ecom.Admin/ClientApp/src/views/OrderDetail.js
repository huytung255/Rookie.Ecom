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
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  Form,
  Media,
  Col,
  CardBody,
  FormGroup,
  Input,
  Table,
  Container,
  Row,
  CardFooter,
  Button,
} from "reactstrap";
// core components
import { NavLink, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Order";
import EmptyHeader from "../components/Headers/EmptyHeader.js";
import { addDefaultSrc } from "../utils/imgManager";
import MyDropdown from "../components/MyDropdown";
const enumStatus = {
  Processing: 0,
  Confirmed: 1,
  Shipping: 2,
  Success: 3,
  Canceled: 4,
};
const enumStatusReverse = {
  0: "Processing",
  1: "Confirmed",
  2: "Shipping",
  3: "Success",
  4: "Canceled",
};
const OrderDetail = ({
  requestOrderDetail,
  updateCategoryDetail,
  orderDetail,
}) => {
  const { id } = useParams();
  const {
    orderDetails,
    user,
    receiverFullName,
    receiverPhoneNumber,
    shippingAddress,
    note,
    status,
    total,
  } = orderDetail;
  const [orderStatus, setOrderStatus] = useState();
  useEffect(() => {
    setOrderStatus(enumStatus[status]);
  }, [status]);
  useEffect(() => {
    requestOrderDetail(id);
  }, []);
  const onSave = () => {
    updateCategoryDetail(id, orderStatus);
  };
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
                <Row className="align-items-center justify-content-between">
                  <div className="col">
                    <h3 className="mb-0">Ordered Products</h3>
                  </div>
                  <div className="col">
                    <h5 className="mb-0 text-right">
                      Status:{" "}
                      <MyDropdown
                        value={orderStatus}
                        setValue={setOrderStatus}
                        items={enumStatusReverse}
                        notNull={true}
                        direction="start"
                      />
                      <a
                        onClick={onSave}
                        className={
                          "btn btn-success btn-sm " +
                          (enumStatus[status] === orderStatus ? "disabled" : "")
                        }
                      >
                        <i className="fas fa-save"></i>
                      </a>
                    </h5>
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
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-center">
                      Unit price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((detail, i) => {
                    const { product, quantity, unitPrice } = detail;
                    const { defaultImage, name } = product;
                    return (
                      <tr key={i}>
                        <td className="text-center">
                          <Media className="align-items-center">
                            <div className="">
                              <img
                                className="img-fluid rounded"
                                alt={defaultImage.caption}
                                src={defaultImage.imageUrl}
                                onError={addDefaultSrc}
                              />
                            </div>
                          </Media>
                        </td>
                        <td className="w-100">{name}</td>
                        <td className="w-100 text-center">{quantity}</td>
                        <td className="w-100 text-center">{unitPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="text-center">
                <h5>Total: {total}</h5>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <Container className="mt-3" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">User</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Full name
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={user.fullName}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                            value={user.email}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Phone number
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={user.phoneNumber}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={user.userAddress}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Receiver</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Receiver's name
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={receiverFullName}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Phone number
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={receiverPhoneNumber}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Shipping address
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={shippingAddress}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Note
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            value={note}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default connect(
  (state) => state.orders,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(OrderDetail);
