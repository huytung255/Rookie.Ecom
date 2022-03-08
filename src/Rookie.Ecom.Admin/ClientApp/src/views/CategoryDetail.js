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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Category";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import EmptyHeader from "../components/Headers/EmptyHeader.js";
import { Controller, useForm } from "react-hook-form";
const CategoryDetail = ({
  requestCategoryDetail,
  updateCategoryDetail,
  updateCategoryImage,
  match,
  categoryDetail,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "all" });

  useEffect(() => {
    requestCategoryDetail(match.params.id);
  }, []);
  useEffect(() => {
    setValue("name", categoryDetail.name);
    setValue("desc", categoryDetail.desc);
  }, [categoryDetail]);
  const onClick = (data) => {
    updateCategoryDetail(match.params.id, data.name, data.desc);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      updateCategoryImage(match.params.id, img);
    }
  };
  return (
    <React.Fragment>
      <EmptyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className=" mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <img
                  className="img-fluid"
                  alt={categoryDetail.name}
                  src={categoryDetail.imageUrl}
                />
              </CardHeader>
              <CardBody className="pt-0 text-center">
                <a className="btn btn-info btn-sm button-input">
                  <i className="fas fa-camera mr-1"></i>
                  Upload picture
                  <input
                    id="image-upload"
                    type="file"
                    onChange={onImageChange}
                  />
                </a>
              </CardBody>
            </Card>
          </Col>
          <Col className="" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Category Detail</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Name
                          </label>
                          <Controller
                            name="name"
                            control={control}
                            shouldUnregister={true}
                            rules={{ required: true }}
                            render={({ field }) => {
                              return (
                                <Input
                                  invalid={!!errors.name}
                                  className="form-control-alternative"
                                  placeholder="Category Name"
                                  type="text"
                                  {...field}
                                />
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Description
                      </label>
                      <Controller
                        name="desc"
                        control={control}
                        shouldUnregister={true}
                        rules={{}}
                        render={({ field }) => {
                          return (
                            <Input
                              invalid={!!errors.desc}
                              className="form-control-alternative"
                              placeholder="Category Description"
                              rows="4"
                              type="textarea"
                              {...field}
                            />
                          );
                        }}
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
              <CardFooter className="bg-white border-0 text-right">
                <a
                  onClick={handleSubmit(onClick)}
                  className="btn btn-primary btn-sm"
                >
                  <i className="fas fa-save mr-1"></i>
                  Save
                </a>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default connect(
  (state) => state.categories,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(CategoryDetail);
