import React, { useEffect } from "react";
import Menu from "./Menu";
import Layout from "./Layout";
import Search from "./Search";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  statusArrival,
  statusSell,
  productsBySell,
  productsByArrival,
} from "../admin/product/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const arrivalStatus = useSelector(statusArrival);
  const sellStatus = useSelector(statusSell);
  const productBySell = useSelector(productsByArrival);
  const productByArrival = useSelector(productsBySell);

  useEffect(() => {
    if (sellStatus === "idle") dispatch(getProducts("sold"));
    if (arrivalStatus === "idle") dispatch(getProducts("createdAt"));
  }, []);

  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Book Shop"
        description="E-Commerce App for web development courses and books."
        className="container-fluid"
      >
        <div>
          <Search />
        </div>
        <div className="row">
          <div className="col-6">
            <h2>Best Sells</h2>
            {productBySell?.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
          <div className="col-6">
            <h2>New Arrivals</h2>
            {productByArrival?.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
