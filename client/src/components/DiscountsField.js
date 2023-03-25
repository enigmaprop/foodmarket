import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DiscountField = (parms)=>{
    const [addId , setAddId] = useState('');
    const [value , setValue] = useState(0);
    const [addReponse , setAddResponse] = useState('');
    const [cost , setCost] = useState('');

    const [deleteId , setDeleteId] = useState('');
    const [deleteResponst , setDeleteResponse] = useState('');

    const [toProductId , setToProductId] = useState('');
    const [toProductValue , setToProductValue] = useState('');
    const [toProductResponse , setToProductResponse] = useState('');

    const [fromProductResponst , setFromProductResponse] = useState('');
    const [fromProductId , setFromProductId] = useState('')

    const [discounts , setDiscounts] = useState([]);
    
    const addSubmitHandler = async(e)=>{
        e.preventDefault();
        const data = {id: addId , value , cost};
        await axios.post(`${parms.url}discount/addGeneralDiscount` , data , {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' ,
                "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
            }
        }).then(async(val)=>{
            setAddResponse(val.data)
            const updatedDiscounts = await axios.get(`${parms.url}discount/`);
            setDiscounts(updatedDiscounts.data)
        })
    }

    const deleteSubmitHandler = async(e)=>{
        e.preventDefault();
        const id = deleteId ;
        await axios.delete(`${parms.url}discount/deleteGeneralDiscount/${id}` , {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' ,
                "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
            }
        }).then((val)=>{
            setDeleteResponse(val.data);
        })
    }


    const addToProductSubmitHandler = async(e)=>{
        e.preventDefault();
        const id = toProductId ;
        const discount = toProductValue ;
        await axios.get(`${parms.url}discount/addProductDiscount/${id}/${discount}` , {
            headers: {
                "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
            }
        }).then(val=>{
            setToProductResponse(val.data);
        })
    }

    const deleteFromProductSubmitHandler = async(e)=>{
        e.preventDefault();
        const id = fromProductId ;
        await axios.delete(`${parms.url}discount/deleteProductDiscount/${id}` , {
            headers: {
                "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
            }
        }).then(val=>{
            setFromProductResponse(val.data);
        })
        
    }

    useEffect(()=>{
        const getDiscounts = async()=>{
            const discounts = await axios.get(`${parms.url}discount/`);
            setDiscounts(discounts.data);
        }
        getDiscounts()
    } , [parms])
    if(discounts){
    return(
        <div>
            <div className='flex justify-center items-start'>
                <div className='m-20 p-6'>
                    <h6 className='text-2xl'>Add discount</h6>
                    <form onSubmit={e=>addSubmitHandler(e)}>
                        <div className='flex flex-col my-12'>
                            <label>ID :</label>
                            <input onChange={e=>setAddId(e.target.value)} className='mt-2 h-8 p-3 border border-gray-600 border-3px rounded-lg' type={'text'}/>
                        </div>
                        <div className='flex flex-col my-12'>
                            <label>Value :</label>
                            <input onChange={e=>setValue(e.target.value)} className='mt-2 h-8 p-3 border border-gray-600 border-3px rounded-lg' type={'number'} step="0.01" min='0' max='1'/>
                        </div>

                        <div className='flex flex-col my-12'>
                            <label>Cost :</label>
                            <input onChange={e=>setCost(e.target.value)} className='mt-2 h-8 p-3 border border-gray-600 border-3px rounded-lg' type={'number'} />
                        </div>
                        <div className='flex flex-col'>
                            <input className='p-1 w-20 h-8 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600' type="submit" />
                            <label className='mt-5'>{addReponse}</label>
                        </div>        
                    </form>
                </div>
                <div className='m-20 p-6'>
                    <h6 className='text-2xl'>Delete discount</h6>
                    <form onSubmit={e=>deleteSubmitHandler(e)}>
                        <div className='flex flex-col my-12'>
                            <label>ID :</label>
                            <input onChange={e=>setDeleteId(e.target.value)} className='mt-2 h-8 p-3 border border-gray-600 border-3px rounded-lg' type={'text'}/>
                        </div>
                        <div className='flex flex-col'>
                            <input className='p-1 w-20 h-8 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600' type="submit" />
                            <label className='mt-5'>{deleteResponst}</label>
                        </div>        
                    </form>
                </div>
                
            </div>

            <div id='discounts' className='flex justify-center items-center m-12 p-6'>
                <table className="w-full text-left border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="py-2 px-4 font-semibold text-sm text-gray-600 border border-gray-300">
                            ID
                        </th>
                        <th className="py-2 px-4 font-semibold text-sm text-gray-600 border border-gray-300">
                            Value
                        </th>
                        <th className="py-2 px-4 font-semibold text-sm text-gray-600 border border-gray-300">
                            Cost
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((row) => (
                        <tr key={row.id}>
                            <td className="py-2 px-4 border border-gray-300">{row.id}</td>
                            <td className="py-2 px-4 border border-gray-300">{row.value}</td>
                            <td className="py-2 px-4 border border-gray-300">{row.cost}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

            <div className='flex justify-center items-start'>
                <div className='m-20 p-6'>
                    <h6 className='text-2xl'>Add discount to product</h6>
                    <form onSubmit={e=>addToProductSubmitHandler(e)}>
                        <div className='flex flex-col my-12'>
                            <label>Product ID :</label>
                            <input onChange={e=>setToProductId(e.target.value)} className='mt-2 h-8 p-3 border border-gray-600 border-3px rounded-lg' type={'text'}/>
                        </div>
                        <div className='flex flex-col my-12'>
                            <label>Value :</label>
                            <input onChange={e=>setToProductValue(e.target.value)} className='mt-2 h-8 p-3 border border-gray-600 border-3px rounded-lg' type={'number'} step="0.01" min='0' max='1'/>
                        </div>

                        <div className='flex flex-col'>
                            <input className='p-1 w-20 h-8 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600' type="submit" />
                            <label className='mt-5'>{toProductResponse}</label>
                        </div>        
                    </form>
                </div>

                <div className='m-20 p-6'>
                    <h6 className='text-2xl'>Delete discount from product</h6>
                    <form onSubmit={e=>deleteFromProductSubmitHandler(e)}>
                        <div className='flex flex-col my-12'>
                            <label>Product ID :</label>
                            <input onChange={e=>setFromProductId(e.target.value)} className='mt-2 h-8 p-3 border border-gray-600 border-3px rounded-lg' type={'text'}/>
                        </div>
                        <div className='flex flex-col'>
                            <input className='p-1 w-20 h-8 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600' type="submit" />
                            <label className='mt-5'>{fromProductResponst}</label>
                        </div>        
                    </form>
                </div>
                
            </div>

        </div>
    )
    }else{
        return <div></div>
    }
}

export default DiscountField ;