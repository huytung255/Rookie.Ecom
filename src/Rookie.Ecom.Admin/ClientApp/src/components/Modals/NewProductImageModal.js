import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Product";
import ProductImageForm from "../ProductImageForm";
const NewProductImageModal = ({ addProductImage, productDetail }) => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "all" });
  const toggle = () => setModal(!modal);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(img);
    }
  };
  const onAdd = (data) => {
    if (image) {
      const { caption, isDefault } = data;
      addProductImage(productDetail.id, image, caption, isDefault === "true");
      toggle();
    }
  };
  useEffect(() => {
    setValue("isDefault", "true");
  }, []);
  return (
    <React.Fragment>
      <a className="btn btn-primary btn-sm" onClick={toggle}>
        <i className="fas fa-plus mr-1"></i>
        New
      </a>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="align-items-center " tag="h3" toggle={toggle}>
          Add a new product image
        </ModalHeader>
        <ModalBody>
          <div>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label className="form-control-label">Image</label>
                  <div className="custom-file">
                    <Input
                      id="productImage"
                      className="custom-file-input"
                      type="file"
                      onChange={onImageChange}
                      accept="image/*"
                    />
                    <Label className="custom-file-label" for="productImage">
                      {image ? image.name : "Choose file"}
                    </Label>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <ProductImageForm
            register={register}
            control={control}
            errors={errors}
            shouldUnregister={true}
          />
        </ModalBody>
        <ModalFooter>
          <a className="btn btn-primary btn-sm" onClick={handleSubmit(onAdd)}>
            Add
          </a>
          <a className="btn btn-secondary btn-sm" onClick={toggle}>
            Cancel
          </a>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default connect(
  (state) => state.products,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(NewProductImageModal);
