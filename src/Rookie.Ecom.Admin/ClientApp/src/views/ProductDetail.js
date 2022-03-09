import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Product";
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
  Carousel,
} from "reactstrap";
import EmptyHeader from "../components/Headers/EmptyHeader.js";
import { Controller, useForm } from "react-hook-form";
import { addDefaultSrc, defaultSrc } from "../utils/imgManager";
import ProductForm from "../components/ProductForm";
import ProductImageManager from "../components/ProductImageTable";
import MyCarousel from "../components/MyCarousel";
const ProductDetail = ({
  requestProductDetail,
  updateProductDetail,
  match,
  productDetail,
}) => {
  const [category, setCategory] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "all" });

  useEffect(() => {
    requestProductDetail(match.params.id);
  }, []);
  useEffect(() => {
    setValue("name", productDetail.name);
    setValue("desc", productDetail.desc);
    setValue("price", productDetail.price);
    setValue("isFeatured", productDetail.isFeatured + "");
    setValue("isAvailable", productDetail.isAvailable + "");
    if (productDetail.categoryId) setCategory(productDetail.categoryId);
  }, [productDetail]);
  const onClick = (data) => {
    const { name, desc, price, isFeatured, isAvailable } = data;
    updateProductDetail(
      match.params.id,
      name,
      parseFloat(price),
      desc,
      category,
      isFeatured === "true",
      isAvailable === "true"
    );
    // updateProductDetail(match.params.id, data.name, data.desc);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      //   updateCategoryImage(match.params.id, img);
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
                {productDetail.productImages.length !== 0 ? (
                  <MyCarousel
                    items={productDetail.productImages}
                    defaultItem={productDetail.defaultImage}
                  />
                ) : (
                  <img
                    className="img-fluid rounded"
                    alt={productDetail.name}
                    src={defaultSrc}
                  />
                )}
              </CardHeader>
            </Card>
          </Col>
          <Col className="" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Category Detail</h3>
              </CardHeader>
              <CardBody>
                <ProductForm
                  register={register}
                  control={control}
                  errors={errors}
                  category={category}
                  setCategory={setCategory}
                />
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
      <ProductImageManager />
    </React.Fragment>
  );
};
export default connect(
  (state) => state.products,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(ProductDetail);
