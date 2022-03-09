import React from "react";
import {
  Container,
  Row,
  Card,
  CardHeader,
  Table,
  Badge,
  Media,
  CardFooter,
} from "reactstrap";
import NewProductImageModal from "./Modals/NewProductImageModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Product";
import { addDefaultSrc } from "../utils/imgManager";
import EditProductImageModal from "./Modals/EditProductImageModal";
import DeleteModal from "./Modals/DeleteModal";
const ProductImageManager = ({ productDetail, deleteProductImage }) => {
  const renderStatus = (status) => (
    <Badge color="" className="badge-dot mr-4">
      {status ? (
        <React.Fragment>
          <i className="bg-success" />
          Yes
        </React.Fragment>
      ) : (
        <React.Fragment>
          <i className="bg-warning" />
          No
        </React.Fragment>
      )}
    </Badge>
  );
  return (
    <Container className="" fluid>
      <Row className="mt-5">
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Image manager</h3>
                </div>
                <div className="col text-right">
                  <NewProductImageModal />
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col" className="text-center">
                    Image
                  </th>
                  <th scope="col">Caption</th>
                  <th scope="col">Default</th>
                  <th scope="col" className="text-center">
                    Edit
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {productDetail.productImages.map((image, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">
                        <Media className="align-items-center">
                          <div className="">
                            <img
                              className="img-fluid rounded"
                              alt={image.caption}
                              src={image.imageUrl}
                              onError={addDefaultSrc}
                            />
                          </div>
                        </Media>
                      </td>
                      <td className="w-100">{image.caption}</td>
                      <td className="w-100">{renderStatus(image.isDefault)}</td>
                      <td className="text-center">
                        <EditProductImageModal
                          id={image.id}
                          caption={image.caption}
                          isDefault={image.isDefault}
                        />
                      </td>
                      <td className="text-center">
                        <DeleteModal
                          id={image.id}
                          title="image"
                          deleteFunc={deleteProductImage}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {productDetail.productImages.length === 0 && (
              <CardFooter className="text-center">
                <h5>Nothing here yet.</h5>
              </CardFooter>
            )}
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default connect(
  (state) => state.products,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(ProductImageManager);
