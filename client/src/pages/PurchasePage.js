import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Purchase from "../components/Purchase";
import Cookies from "js-cookie";

const PurchasePage = (parms)=>{

    if(Cookies.get(parms.cartName) && Cookies.get(parms.formOrder)){
        const products = JSON.parse(Cookies.get(parms.cartName))
        return(
            <div>
                <header className="">
                    <nav><Nav /></nav>
                </header>
    
                <section className="m-24"><Purchase id={parms.id} url={parms.url} products={products} cartName={parms.cartName} formOrder={parms.formOrder}/></section>
    
                <footer>
                    <div><Footer/></div>
                </footer>
            </div>
        );
    }else{
        window.location.replace('/')
    }
   
}

export default PurchasePage