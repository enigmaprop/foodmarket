import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AdminDashboard from "../components/AdminDashboard";
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminPage = (parms)=>{
    const [auth , setAuth] = useState(0);

        useEffect(()=>{
            const isAdmin = async()=>{
                const response = await axios.post(`${parms.url}admin/` , {key:Cookies.get(parms.pubkey)} , {
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                })
                if(response.data.success){
                    setAuth(1)
                }else{
                    setAuth(2)
                }
                console.log(response.data);
            }
            isAdmin();
        } , [parms])

        if(Cookies.get(parms.pubkey) && auth === 1 && auth !== 0){
            {console.log(auth);}
            return(
                <div>
                    <header>
                        <nav>
                            <Nav />
                        </nav>
                    </header>

                    <section>
                        <div className="mt-[14vh] mb-[14vh]">{<AdminDashboard pubkey={parms.pubkey} url={parms.url}/>}</div>
                    </section>
                    
                    <footer>
                        <div><Footer/></div>
                    </footer>
                </div>
            );
    }else if(auth === 2 && auth !== 0){
        window.location.replace('/')
    }

}

export default AdminPage