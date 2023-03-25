import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const formatCurrency = (value) => {
    
  const options = { style: "currency", currency: "ILS" };
  return new Intl.NumberFormat("he-IL", options).format(value);
};


const Receipt = (parms) => {

    const [order , setOrder] = useState({});
    const [total , setTotal] = useState(0);
    useEffect(()=>{
        const getOrders = async()=>{
            const response = await axios.get(`${parms.url}orders/byId/${parms.id}` , {
                headers:{
                  "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
                }
              }).then((val)=>{
                console.log(val.data);
                const total = val.data.products.map((val , i)=>{
                    return val.totalPrice
                }).reduce((prev , curr)=>{
                    if(prev && curr){
                        return prev + curr ;
                    }else{
                        return prev ;
                    }
                })
                console.log(total);
                if(typeof(total)==='number'){
                    setTotal(total)
                }else{
                    setTotal(total.totalPrice)
                }
                setOrder(val.data);
              });
        }

        getOrders();
    } , [parms])
    
    if(order.products){
    
        return(
                  <div className="p-1 w-[80mm] border border-black border-1px border-solid">
                            <h1 className="text-right font-bold text-xl p-2">الوصل</h1>
                            <div className="flex flex-col">
                                <span className="text-black text-md font-bold p-1">ID: </span>
                                <span className="text-black text-sm font-bold text-center">{order.id}</span>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                
                                <div className="bg-gray-500 w-[90%] h-1 my-5"></div>

                                <table className="w-full">
                                    <thead className="bg-gray-300 p-1">
                                        <th className="w-1/3 px-2 text-sm">الصنف</th>
                                        <th className="w-1/6 px-2 text-sm">الكمية</th>
                                        <th className="w-1/6 px-2 text-sm">السعر</th>
                                        <th className="w-1/3 px-1 text-sm">السعر الكلي</th>
                                    </thead>
                                    <tbody className="divide-y divide-gray-300">
                                        {order.products.map((val , i)=>{
                                            console.log(order)
                                            return (<tr className="bg-gray-100 hover:bg-gray-200 transition-all duration-200">
                                            <td key={val.productId} className="px-2 py-1 text-sm">{val.productName}</td>
                                            <td key={val.productId} className="px-2 py-1 text-right text-sm">{val.quantity}</td>
                                            <td key={val.productId} className="px-2 py-1 text-right text-sm">{(val.unitPrice).toFixed(2)}</td>
                                            <td key={val.productId} className="px-2 py-1 text-right text-sm">{(val.totalPrice).toFixed(2)}</td>
                                        </tr>)
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="m-2 my-5 font-bold text-sm border border-1px border-gray-500">
                                <div className="my-3 text-center ">
                                    <span className="">Subtotal: {formatCurrency(total)}</span>

                                </div>

                                <div className="my-3 text-center">
                                    <span className="">discount: {order.discount * 100}%</span>
                                </div>

                                <div className="my-3 text-center">
                                    <span className="">Total price: {formatCurrency(total - (total * order.discount))}</span>
                                </div>
                            </div>
                        </div>

        )
    }else{
        return(
            <div>Loading ...</div>
        )
    }
};

export default Receipt;