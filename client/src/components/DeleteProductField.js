import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const DeleteProductField = (parms)=>{
    const [id , setId] = useState('');
    const [response , setResponse] = useState('');

    //Delete product when click on submit
    const deleteProduct = (e)=>{
        e.preventDefault();
        console.log(id);
        const response = axios.delete(`${parms.url}products/deleteProduct/${id}` , {
            headers:{
                "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
            }
        });
        setResponse(response.data);
    }

    return(
        <div className='flex flex-col justify-around items-center w-full h-full'>
            <h3 className='text-2xl'>Delete Product</h3>
            <div className='flex'>
                <label>Product Id :</label>
                <input onChange={(e)=>setId(e.target.value)} className='ml-1 text-black' name='name' type={'text'} />
            </div>
            <input onClick={e=>deleteProduct(e)} className='bg-blue-700 w-20 h-8 rounded-md hover:bg-blue-600' type={'submit'}/>
            <label className='text-green-500 mt-3'>{response}</label>
        </div>
    )
}

export default DeleteProductField ;