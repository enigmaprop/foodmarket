import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

const CartPage = (parms)=>{
    return(
        <div>
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>

            <section>
                <div className="mt-[14vh] mb-[14vh]"><Cart url={parms.url} cartName={parms.cartName} /></div>
            </section>
            
            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
}

export default CartPage