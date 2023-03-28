import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import RefundPolicy from "../components/RefundPolicy";

const RefundPolicyPage = (parms)=>{
    return(
        <div>
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>

            <section>
                <div className="mt-[14vh] mb-[14vh]"><RefundPolicy url={parms.url} /></div>
            </section>
            
            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );

}

export default RefundPolicyPage