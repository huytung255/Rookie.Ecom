import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Product";
import ProductImageForm from "../ProductImageForm";
const EditProductImageModal = ({
  updateProductImage,
  id,
  caption,
  isDefault,
}) => {
  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "all" });
  useEffect(() => {
    setValue("caption", caption);
    setValue("isDefault", isDefault + "");
  }, [caption, isDefault]);
  const toggle = () => setModal(!modal);
  const onEdit = (data) => {
    const { caption, isDefault } = data;
    updateProductImage(id, caption, isDefault === "true");
    toggle();
  };

  return (
    <React.Fragment>
      <Button
        className="btn-icon-only text-success"
        role="button"
        onClick={toggle}
        color=""
      >
        <i className="fas fa-pen"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle} scrollable size="lg">
        <ModalHeader className="align-items-center " tag="h3" toggle={toggle}>
          Edit an image
        </ModalHeader>
        <ModalBody>
          <ProductImageForm
            register={register}
            control={control}
            errors={errors}
            shouldUnregister={false}
          />
        </ModalBody>
        <ModalFooter>
          <a className="btn btn-primary btn-sm" onClick={handleSubmit(onEdit)}>
            Edit
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
)(EditProductImageModal);
