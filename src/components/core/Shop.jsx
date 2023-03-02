import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { productBySearch } from "../core/Api";
import CheckBox from "./CheckBox";
import RadioBtn from "./RadioBtn";
import { pricess } from "./priceRanges";
import ProductCard from "./ProductCard";
//
//
import { useDispatch, useSelector } from "react-redux";
import { categories, getCategories } from "../admin/category/categorySlice";
import {
  getProductsBySearch,
  productsBySearch,
} from "../admin/product/productSlice";

function Shop(props) {
  const dispatch = useDispatch();
  const allCategories = useSelector(categories);
  const searchedProducts = useSelector(productsBySearch);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);

  const handleFilters = (filters, filterBy) => {
    const allFilters = { ...myFilters };
    allFilters.filters[filterBy] = filters;
    loadFilteredData(myFilters.filters);
    setMyFilters(allFilters);
  };
  const loadFilteredData = async (newFilters) => {
    const { data } = await productBySearch(limit, skip, newFilters);
    dispatch(getProductsBySearch(data.data));
  };

  useEffect(() => {
    dispatch(getCategories());
    loadFilteredData(myFilters.filters);
  }, []);

  return (
    <Layout
      title="Shop Page"
      description="E-Commerce Book Shop, Let's choose courses and books accordingly."
      className="mb-5 container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Select Categories</h4>
          <ul>
            <CheckBox
              categories={allCategories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Select Price Range</h4>
          <ul>
            <RadioBtn
              pricess={pricess}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>
        <div className="col-8">
          <h2>Products</h2>
          <div className="row">
            {searchedProducts?.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Shop;
