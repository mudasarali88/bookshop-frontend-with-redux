import React, { useEffect, useState } from "react";
import Menu from "./components/core/Menu";
import Layout from "./components/core/Layout";
import ProductCard from "./components/core/ProductCard";
import { getProducts } from "./components/core/Api";

const App = () => {
  const [productsBySell, setProductsBySell] = useState([
    {
      sold: 11,
      name: "React",
      description: "My 1st react book",
      price: 10,
    },
  ]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  // const [error, setError] = useState(false);

  const soldProducts = async () => {
    const { data } = await getProducts("sold");
    setProductsBySell({ productsBySell: data });
  };
  const createdAtProducts = async () => {
    const { data } = await getProducts("sold");
    setProductsByArrival({ productsByArrival: data });
  };

  useEffect(() => {
    soldProducts();
    createdAtProducts();
  }, []);

  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Book Shop"
        description="E-Commerce App for web development courses and books."
        className="container-fluid"
      >
        {console.log(productsBySell)}
        {/* {productsBySell.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))} */}
        {/* {ProductsLayout()} */}
      </Layout>
    </React.Fragment>
  );
};

export default App;
