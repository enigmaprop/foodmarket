import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProductHolder from "../components/ProductHolder";

const ProductPage = (parms)=>{
    return(
        <div>
            <header className="">
                <nav><Nav /></nav>
            </header>

                <section><ProductHolder cartName={parms.cartName} url={parms.url} /></section>

            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
}

export default ProductPage