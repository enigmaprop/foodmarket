import React, { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import Nav from "../components/Nav";
import Categories from "../components/Catagories";
import Footer from "../components/Footer";
import ProductsCardsHolder from "../components/ProductsCardsHolder";
import LastNews from "../components/LastNews";
import axios from 'axios';

const MainPage = (parms)=>{

  const [categories , setCategories] = useState([]);
  const [products , setProducts] = useState([]);

    useEffect(()=>{
      const getCategories = async()=>{
        const response = await axios.get(`${parms.url}categories/`);
        const categories = response.data;
        setCategories(categories);
      }
      getCategories();

      const getProducts = async()=>{
        const response = await axios.get(`${parms.url}products/`);
        const products = response.data;
        setProducts(products);
      }
      getProducts();
    } , [parms])

    const hproducts = [
        {
          id: 1,
          name: "Product 1",
          image: "https://via.placeholder.com/300x200",
          price: "$100",
        },
        {
          id: 2,
          name: "Product 2",
          image: "https://via.placeholder.com/300x200",
          price: "$80",
        },
        {
          id: 3,
          name: "Product 3",
          image: "https://via.placeholder.com/300x200",
          price: "$120",
        },
        {
          id: 4,
          name: "Product 4",
          image: "https://via.placeholder.com/300x200",
          price: "$90",
        },
        {
          id: 5,
          name: "Product 5",
          image: "https://via.placeholder.com/300x200",
          price: "$150",
        },
        {
          id: 6,
          name: "Product 6",
          image: "https://via.placeholder.com/300x200",
          price: "$70",
        },
      ];

    if(categories.length > 0){
    return(
        <div>
            <header className="">
                <nav><Nav /></nav>
                <HeroSlider />
            </header>
            <section className="mt-[14vh] mb-[14vh]"><Categories url={parms.url}  /></section>

            <section className="m-12 my-60"><LastNews url={parms.url} /></section>

            {categories.map((val , i)=>{
              const categoryProducts = products.filter((product , i)=>{
                return product.catagory === val.name
              });
              categoryProducts.reverse();
            return <section><ProductsCardsHolder url={parms.url} productList={categoryProducts} className="mt-12" categoryName={val.name}/></section>
            })}
            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
    }else{
      return <div>Loading ...</div>
    }
}

export default MainPage