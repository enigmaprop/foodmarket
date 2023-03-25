import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const DeleteCategoryField = (parms)=>{
    const [name , setName] = useState('');
    const [response , setResponse] = useState('');

    //Delete product when click on submit
    const deleteProduct = (e)=>{
        e.preventDefault();
        console.log(name);
        const response = axios.delete(`${parms.url}categories/deleteCategory/${name}` , {
            headers:{
                "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
            }
        });
        setResponse(response.data);
    }

    return(
        <div className='flex flex-col justify-around items-center w-full h-full'>
            <h3 className='text-2xl'>Delete Category</h3>
            <div className='flex'>
                <label>Category Name :</label>
                <input onChange={(e)=>setName(e.target.value)} className='ml-1 text-black' name='name' type={'text'} />
            </div>
            <input onClick={e=>deleteProduct(e)} className='bg-blue-700 w-20 h-8 rounded-md hover:bg-blue-600' type={'submit'}/>
            <label className='text-green-500 mt-3'>{response}</label>
        </div>
    )
}

export default DeleteCategoryField ;