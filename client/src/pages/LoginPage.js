import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Cookies from "js-cookie";

const LoginPage = (parms)=>{
    return(
        <div>
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>

            <section>
                <div className="mt-[14vh] mb-[14vh]"><LoginForm url={parms.url} /></div>
            </section>
            
            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );

}

export default LoginPage