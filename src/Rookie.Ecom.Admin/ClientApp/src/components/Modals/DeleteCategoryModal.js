import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const DeleteCategoryModal = ({ id, deleteCategory }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const onDelete = () => {
    deleteCategory(id);
    toggle();
  };
  return (
    <React.Fragment>
      <Button
        className="btn-icon-only text-danger"
        role="button"
        color=""
        size=""
        onClick={toggle}
      >
        <i className="fas fa-trash-alt"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="align-items-center " tag="h3" toggle={toggle}>
          Delete category
        </ModalHeader>
        <ModalBody>Do you really want to delete this category?</ModalBody>
        <ModalFooter>
          <a className="btn btn-danger btn-sm" onClick={onDelete}>
            Yes
          </a>
          <a className="btn btn-secondary btn-sm" onClick={toggle}>
            No
          </a>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteCategoryModal;
