import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LoginForm from "../components/loginAdmin";

const AdminLoginPage = (parms)=>{
    return(
        <div>
            <header>
                <nav>
                    <Nav />
                </nav>
            </header>

            <section>
                <div className="flex justify-center p-6 m-24"><LoginForm pubkey={parms.pubkey} url={parms.url} /></div>
            </section>
            
            <footer>
                <div><Footer/></div>
            </footer>
        </div>
    );
}

export default AdminLoginPage