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
  Dropdown,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Product";
import ProductForm from "../ProductForm";
const NewProductModal = ({ addProduct }) => {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "all" });
  const toggle = () => setModal(!modal);
  const onAdd = (data) => {
    const { name, desc, price, isFeatured, isAvailable } = data;
    addProduct(
      name,
      parseFloat(price),
      desc,
      category,
      isFeatured === "true",
      isAvailable === "true"
    );
    toggle();
  };

  return (
    <React.Fragment>
      <a className="btn btn-primary btn-sm" onClick={toggle}>
        <i className="fas fa-plus mr-1"></i>
        New
      </a>
      <Modal isOpen={modal} toggle={toggle} scrollable size="lg">
        <ModalHeader className="align-items-center " tag="h3" toggle={toggle}>
          Add a new product
        </ModalHeader>
        <ModalBody>
          <ProductForm
            register={register}
            control={control}
            errors={errors}
            category={category}
            setCategory={setCategory}
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
)(NewProductModal);
