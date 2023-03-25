import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const AddNewsField = (parms)=>{

    const [news , setNews] = useState('');
    const [response , setResponse] = useState('');

    const submitHandler = async(e)=>{
        e.preventDefault();
        const response = await axios.get(`${parms.url}news/addNews/${news}` , {
            headers: {
                "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
            }
        });
        setResponse(response.data);
    }

    return(
        <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center p-12 w-full'>

                <label className='mb-5 font-bold'>Add News</label>
                <input onChange={e=>setNews(e.target.value)} className='border text-center border-1px border-gray-500 h-8 w-1/3 rounded-lg' type={'text'}/>

                <div className='flex flex-col my-12'>
                    <button onClick={e=>submitHandler(e)} className='bg-indigo-500 hover:bg-indigo-600 p-1 w-20 rounded-lg text-white my-6'>إرسال</button>
                    <label>{response}</label>
                </div>

            </div>

        </div>
    )
}

export default AddNewsField ;