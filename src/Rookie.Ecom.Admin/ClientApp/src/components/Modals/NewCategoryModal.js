import React, { useState } from "react";
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
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
const NewCategoryModal = ({ addCategory }) => {
  const [modal, setModal] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "all" });
  const toggle = () => setModal(!modal);
  const onAdd = (data) => {
    toggle();
    addCategory(data.name, data.desc);
  };
  return (
    <React.Fragment>
      <a className="btn btn-primary btn-sm" onClick={toggle}>
        <i className="fas fa-plus mr-1"></i>
        New
      </a>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="align-items-center " tag="h3" toggle={toggle}>
          Add a new category
        </ModalHeader>
        <ModalBody>
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
            <div>
              <FormGroup>
                <label className="form-control-label">Description</label>
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

export default NewCategoryModal;
