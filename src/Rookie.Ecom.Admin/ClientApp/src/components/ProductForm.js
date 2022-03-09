import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Form, FormGroup, Row, Col, Input } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Category";
import MyDropdown from "./MyDropdown";
const ProductForm = ({
  register,
  control,
  errors,
  requestAllCategories,
  allCategories,
  category,
  setCategory,
}) => {
  useEffect(() => {
    requestAllCategories();
  }, []);
  return (
    <Form>
      <div>
        <Row>
          <Col md="12">
            <FormGroup>
              <label className="form-control-label">Name</label>
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
                      placeholder="Name"
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
      <div>
        <Row>
          <Col md="12">
            <FormGroup>
              <label className="form-control-label">Price</label>
              <Controller
                name="price"
                control={control}
                shouldUnregister={true}
                rules={{ required: true, pattern: "[0-9]" }}
                render={({ field }) => {
                  return (
                    <Input
                      invalid={!!errors.price}
                      className="form-control-alternative"
                      placeholder="Price"
                      type="number"
                      {...field}
                    />
                  );
                }}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
      <div>
        <FormGroup>
          <label className="form-control-label">Description</label>
          <Controller
            name="desc"
            control={control}
            shouldUnregister={true}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Input
                  invalid={!!errors.desc}
                  className="form-control-alternative"
                  placeholder="Description"
                  rows="4"
                  type="textarea"
                  {...field}
                />
              );
            }}
          />
        </FormGroup>
      </div>
      <FormGroup className="d-flex flex-column">
        <label className="form-control-label">Category</label>
        <MyDropdown
          value={category}
          setValue={setCategory}
          items={allCategories}
        />
      </FormGroup>
      <FormGroup>
        <label className="form-control-label">Is this product featured</label>
        <div className="form-check">
          <input
            {...register("isFeatured")}
            className="form-check-input"
            type="radio"
            name="isFeatured"
            id="isFeaturedRadios1"
            value="true"
          />
          <label className="form-check-label" htmlFor="isFeaturedRadios1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            {...register("isFeatured")}
            className="form-check-input"
            type="radio"
            name="isFeatured"
            id="isFeaturedRadios2"
            value="false"
          />
          <label className="form-check-label" htmlFor="isFeaturedRadios2">
            No
          </label>
        </div>
      </FormGroup>
      <FormGroup>
        <label className="form-control-label">Is this product available</label>
        <div className="form-check">
          <input
            {...register("isAvailable")}
            className="form-check-input"
            type="radio"
            name="isAvailable"
            id="isAvailableRadios1"
            value="true"
          />
          <label className="form-check-label" htmlFor="isAvailableRadios1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            {...register("isAvailable")}
            className="form-check-input"
            type="radio"
            name="isAvailable"
            id="isAvailableRadios2"
            value="false"
          />
          <label className="form-check-label" htmlFor="isAvailableRadios2">
            No
          </label>
        </div>
      </FormGroup>
    </Form>
  );
};

export default connect(
  (state) => state.categories,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(ProductForm);
