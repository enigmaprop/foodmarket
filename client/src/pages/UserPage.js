import React , {useState , useEffect} from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";
import Cookies from "js-cookie";
import DiscountCodeShop from "../components/DiscountsCodeShop";
import axios from 'axios';

const UserPage = (parms)=>{

    const [user , setUser] = useState({
        name: "",
        phoneNumber: "",
        password: "",
        points: 0,
        discounts: [] ,
    })

    const [discounts , setDiscounts] = useState([]);

  useEffect(()=>{
    const getUser = async()=>{
        const id = Cookies.get(parms.id);
        await axios.get(`${parms.url}user/byId/${id}` , {
            headers:{
                "Authorization":`Bearer ${id}`
              }
        } ).then((val)=>{
            if(val.data.phoneNumber){
                setUser({
                    name : val.data.name ,
                    phoneNumber: val.data.phoneNumber ,
                    password : val.data.password ,
                    points : val.data.points ,
                    discounts : val.data.offers ,
                })
            }else{
              window.location.replace('/login')
            }
        }).catch(err=>{
          console.log(err);
          window.location.replace('/login')
        })
    }
    getUser();


    const getDiscounts = async()=>{
        const discounts = await axios.get(`${parms.url}discount/`);
        setDiscounts(discounts.data);
    }
    getDiscounts();
  } , [parms])


    if(Cookies.get(parms.id)){
        return(
            <div>
                <header>
                    <nav>
                        <Nav />
                    </nav>
                </header>

                <section>
                    <div className="mt-[14vh] mb-[14vh]"><UserProfile user={user} id={parms.id} url={parms.url} /></div>
                </section>
                
                <section>
                    <div className="mt-[14vh] mb-[14vh]"><DiscountCodeShop id={parms.id} discounts={discounts} user={user} url={parms.url} /></div>
                </section>

                <footer>
                    <div><Footer/></div>
                </footer>
            </div>
        );
    }else{
        window.location.replace('/login');
    }
}

export default UserPage