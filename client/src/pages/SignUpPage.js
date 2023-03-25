import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = (parms)=>{
    return(
        <div>
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>

            <section>
                <div className="mt-[14vh] mb-[14vh]"><SignUpForm url={parms.url} /></div>
            </section>
            
            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
}

export default SignUpPage