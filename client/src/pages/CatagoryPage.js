import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProductsCardsHolder from "../components/ProductsCardsHolder";
import { useParams } from "react-router-dom";
import axios from 'axios';

const CategoryPage = ({url}) => {
  const { cataName } = useParams();
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}products/byCategory/${cataName}`);
        setProductsList(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [cataName , url]);

  if (loading) {
    return <div>Loading...</div>;
  }else{
    return (
      <div>
        <header>
          <nav><Nav /></nav>
        </header>
  
        <section><ProductsCardsHolder url={url} categoryName={cataName} productList={productsList} /></section>
  
        <footer>
          <div><Footer /></div>
        </footer>
      </div>
    );
  }
  
};

export default CategoryPage;
