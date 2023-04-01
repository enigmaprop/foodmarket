import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function Cart(parms) {

  const [productsIds , setProductsIds] = useState([])

  useEffect(()=>{
    const setIds = async()=>{

      const response = await axios.get(`${parms.url}products/`);

      const ids = response.data.map((val , i)=>{
        return val.id;
      })
  
      setProductsIds(ids);
    }
    setIds();
  } , [parms.url])

  var coockiesItems = []

  if(typeof(Cookies.get(parms.cartName))==="string"){
    coockiesItems = JSON.parse(Cookies.get(parms.cartName))
  }else{
    coockiesItems = []
  }
  const [items, setItems] = useState(typeof(coockiesItems)==='object' ? coockiesItems : []);


  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);

    const coockiesItems = JSON.parse(Cookies.get(parms.cartName));
    const updatedCookiesItems = coockiesItems.filter((item , i)=>JSON.parse(coockiesItems[i]).id !== JSON.parse(coockiesItems[index]).id)
    Cookies.set(parms.cartName , JSON.stringify(updatedCookiesItems))

  };

  const submitHandler = (e)=>{
    e.preventDefault();
    // send to order
    window.location.href = "/order"
  }

  const renderItems = () => {
    return items.map((item, index) => {
      {item = JSON.parse(item)}

      if(productsIds.includes(item.id)){
        return (
          <div key={index} className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
            <div className="flex items-center">
              <img className="w-16 h-16 mr-4" src={item.img} alt={item.name} />
              <div>
                <h2 className="mb-5 mt-5 font-bold text-sm text-black">{item.name}</h2>
                <span>ID: {item.id}</span>
                <p className="text-gray-500">{item.price} شيكل</p>
              </div>
            </div>
            <div>
              <button id={item.id} className="text-red-500" onClick={() => removeItem(index)}>حذف</button>
            </div>
          </div>
        );
      }else if(!(productsIds.includes(item.id)) && productsIds.length !== 0){
        removeItem(index)
        return null
      }
    }
    );
    
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="divide-y divide-gray-300">{renderItems()}</div>
          <div className="text-right mt-12">
            <button onClick={(e)=>{submitHandler(e)}} className="bg-indigo-500 w-24 h-8 rounded-full text-white hover:bg-indigo-700">تأكيد</button>
          </div>
        </div>

      )}
    </div>
  );
}

export default Cart;
