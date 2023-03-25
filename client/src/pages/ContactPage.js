import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

const ContactPage = (parms)=>{
    return(
        <div>
            <header className="">
                <nav><Nav /></nav>
            </header>

            <section><Contact/></section>

            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
}

export default ContactPage