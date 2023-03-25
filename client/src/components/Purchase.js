import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
const Purchase = (parms) => {
  const products = parms.products
  const [discount , setDiscount] = useState('');
  const [response , setResponse] = useState('')

  const totalPrice = products.reduce((acc, product) => {
    return acc + JSON.parse(product).price * JSON.parse(product).quantity;
  }, 0);

  const submitHandler = async (e)=>{
    e.preventDefault();

    const formOrder = Cookies.get(parms.formOrder);
    const cartName = Cookies.get(parms.cartName);


      const order = JSON.parse(formOrder);
      const savedData = JSON.parse(cartName);

      
      const products = savedData.map((val , i)=>{
        return JSON.parse(val);
      })

      order.products = products.map((val , i)=>{
        return{
          productId: val.id ,
          productName: val.name ,
          quantity: val.quantity ,
          unitPrice: val.price ,
          totalPrice : val.quantity * val.price
        }
    })

    order.discount = discount;

    const totalPrice = await order.products.map((val , i)=>{
      return val.totalPrice
    }).reduce((prev , curr)=>{
      if(prev && curr){
        return prev + curr;
      }else{
        return prev
      }
    })


    if(Cookies.get(parms.id)){
      order.userId = Cookies.get(parms.id)
    }

    axios.post( `${parms.url}orders/addOrder` , order , {
      headers: {
        "Content-Type":'application/x-www-form-urlencoded' ,
      }
    }).then((val)=>{

      if(val.data === 'Order added sucessfully'){
        Cookies.remove(parms.cartName)
        Cookies.remove(parms.formOrder) 

            axios.get(`${parms.url}points/dettectPoints/${totalPrice}/${Cookies.get(parms.id)}` , {

              headers: {
                "Authorization":`Bearer ${Cookies.get(parms.id)}`
              }
        
            }).then((res)=>{
              window.location.replace('/')
            }).catch(err=>{
              window.location.replace('/')
            })

      }else{
        setResponse(val.data)
      }

    })


    
  }

  const cancleHandler = (e)=>{
    e.preventDefault();
    Cookies.remove(parms.formOrder)
    window.location.replace('/cart')
  }


  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              اسم المنتج
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              سعر القطعة
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              الكمية
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              السعر
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{JSON.parse(product).name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">شيكل    {(JSON.parse(product).price)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">    {JSON.parse(product).quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">شيكل    {(JSON.parse(product).price * JSON.parse(product).quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Price:</td>
            <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">شيكل {totalPrice}</td>
          </tr>
        </tbody>
      </table>
      <div className='flex flex-col p-6'>
        <label className='my-5'>ادخل رمز الخصم اذا كان لديك واحد</label>
        <input onChange={e=>setDiscount(e.target.value)} className='p-1 rounded-md border border-solid border-gray-600 border-1px' name='discount' type={'text'} />
      </div>

      <div>
        <label>{response}</label>
      </div>

      <div className='flex my-12 justify-around'>
        <div className='text-right'><button onClick={(e)=>{cancleHandler(e)}} className="bg-red-500 w-24 h-8 rounded-full text-white hover:bg-indigo-700 ">الغاء</button></div>
        <div className='text-right'><button onClick={(e)=>{submitHandler(e)}} className="bg-indigo-500 w-24 h-8 rounded-full text-white hover:bg-indigo-700">تأكيد</button></div>
      </div>
    </div>
  ) 

};

export default Purchase;
