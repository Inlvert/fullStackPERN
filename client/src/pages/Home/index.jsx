import React from "react";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import UncontrolledExample from "../../components/UncontrolledExample";
import './style.css'
import ProductDetails from "../../components/ProductDetails";

const HomePage = () => {
  return (
    <div>
      <meta name="keywords" content="React, JavaScript, semantic markup, html"/>
      <title>Home</title>
      <Header />
      <UncontrolledExample />
      <h3>HomePage</h3>
      <ProductList />
      <ProductDetails />
    </div>
  );
};

export default HomePage;
