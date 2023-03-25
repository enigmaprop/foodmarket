import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OrderTable from "../components/OrderTable";
const OrderPage = (parms)=>{
    return(
        <div>
            <header className="mb-12">
                <nav><Nav /></nav>
            </header>

            <section className="mb-[11rem] w-[50%] ml-[25%]"><OrderTable orderForm={parms.formOrder} cartName={parms.cartName}/></section>

            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
}

export default OrderPage