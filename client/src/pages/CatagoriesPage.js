import React from "react";
import Nav from "../components/Nav";
import Categories from "../components/Catagories";
import Footer from "../components/Footer";

const CatagoriesPage = (parms)=>{
    return(
        <div>
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>

            <section>
                <div className="mt-[14vh] mb-[14vh]"><Categories url={parms.url} /></div>
            </section>
            
            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
}

export default CatagoriesPage