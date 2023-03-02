import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import ProductCard from "./ProductCard";
//
//
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProduct,
  getRelatedProducts,
} from "../admin/product/productSlice";
import { relatedProducts, product } from "../admin/product/productSlice";

function SingleProduct(props) {
  const dispatch = useDispatch();
  const allRelatedProducts = useSelector(relatedProducts);
  const singleProduct = useSelector(product);

  const { productId } = useParams();

  useEffect(() => {
    dispatch(getRelatedProducts(productId));
    dispatch(getSingleProduct(productId));
  }, [productId]);

  return (
    <React.Fragment>
      <Layout
        title={singleProduct && singleProduct.name}
        description={singleProduct && singleProduct.description}
        className="container-fluid"
      >
        <div className="row">
          <div className="col-8">
            <h2>Product</h2>
            <ProductCard
              product={singleProduct}
              viewProductBtn={false}
              moreInfo={true}
            />
          </div>
          <div className="col-4">
            <h2>Related Products</h2>
            {allRelatedProducts?.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default SingleProduct;
