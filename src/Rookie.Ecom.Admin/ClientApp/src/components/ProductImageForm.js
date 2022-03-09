import React from "react";
import { Controller } from "react-hook-form";
import { Form, FormGroup, Row, Col, Input, Label, FormText } from "reactstrap";

const ProductImageForm = ({ register, control, errors, shouldUnregister }) => {
  return (
    <Form>
      <div>
        <Row>
          <Col md="12">
            <FormGroup>
              <label className="form-control-label">Caption</label>
              <Controller
                name="caption"
                control={control}
                shouldUnregister={shouldUnregister}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Input
                      invalid={!!errors.caption}
                      className="form-control-alternative"
                      placeholder="Caption"
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

      <FormGroup>
        <label className="form-control-label">Is this a default image?</label>
        <div className="form-check">
          <input
            {...register("isDefault")}
            className="form-check-input"
            type="radio"
            name="isDefault"
            id="isDefaultRadios1"
            value="true"
          />
          <label className="form-check-label" htmlFor="isDefaultRadios1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            {...register("isDefault")}
            className="form-check-input"
            type="radio"
            name="isDefault"
            id="isDefaultRadios2"
            value="false"
          />
          <label className="form-check-label" htmlFor="isDefaultRadios2">
            No
          </label>
        </div>
      </FormGroup>
    </Form>
  );
};

export default ProductImageForm;
