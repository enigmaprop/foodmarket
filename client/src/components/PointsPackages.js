import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const PointsPackages = (parms)=>{
    const [cost , setCost] = useState(0);
    const [points , setPoints] = useState(0);
    const [deleteCost , setDeleteCost] = useState(0);

    const [addResponse , setAddResponse] = useState('');
    const [deleteResponse , setDeleteResponse] = useState('');

    const [offers , setOffers] = useState([]);

    const addSubmitHandler = async(e)=>{
        e.preventDefault();
        if(cost > 0 && points > 0){
            await axios.get(`${parms.url}points/addPoints/${cost}/${points}` , {
                headers: {
                    "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
                }
            }).then((val)=>{
                setAddResponse(val.data)
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    const deleteSubmitHandler = async(e)=>{
        e.preventDefault();
        if(deleteCost > 0){
            await axios.delete(`${parms.url}points/deletePoints/${deleteCost}` , {
                headers: {
                    "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
                }
            }).then((val)=>{
                setDeleteResponse(val.data)
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    useEffect(()=>{
        const getOffers = async()=>{
            await axios.get(`${parms.url}points` , {
                headers: {
                    "Authorization":`Bearer ${Cookies.get(parms.pubkey)}`
                }
            }).then(val=>{
                setOffers(val.data)
            })
        }
        getOffers()
    } , [parms])

    if(offers.length > 0){
        return(
            <div className='flex flex-col'>
                        <div className='flex justify-around'>
                            <div className='flex flex-col items-center m-6 p-6'>
                                <h2 className='text-black text-2xl'>Add points package</h2>
                                <form onSubmit={e=>addSubmitHandler(e)}>
                                    <div className='flex flex-col my-12'>
                                        <label>Cost</label>
                                        <input onChange={e=>setCost(e.target.value)} className='h-8 p-1 rounded-lg border border-solid border-1px border-black' type={'number'} />
                                    </div>
                                    <div className='flex flex-col my-12'>
                                        <label>Points</label>
                                        <input onChange={e=>setPoints(e.target.value)} className='h-8 p-1 rounded-lg border border-solid border-1px border-black' type={'number'} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <input className='bg-indigo-500 hover:bg-indigo-600 p-1 w-20 rounded-lg text-white' type={'submit'}/>
                                        <label className='my-6'>{addResponse}</label>
                                    </div>
                                </form>
                            </div>
                            <div className='flex flex-col items-center m-6 p-6'>
                                <h2 className='text-black text-2xl'>Delete points package</h2>
                                <form onSubmit={e=>deleteSubmitHandler(e)}>
                                    <div className='flex flex-col my-12'>
                                        <label>Points Package Cost</label>
                                        <input onChange={e=>setDeleteCost(e.target.value)} className='h-8 p-1 rounded-lg border border-solid border-1px border-black' type={'number'} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <input className='bg-indigo-500 hover:bg-indigo-600 p-1 w-20 rounded-lg text-white' type={'submit'}/>
                                        <label className='my-6'>{deleteResponse}</label>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div>
                            <table className='flex w-full flex-col justify-around items-center my-20'>
                                <thead className='flex w-1/3 justify-around bg-gray-200'>
                                    <th className='border border-gray-400 text-gray-600 border-1px w-1/2'>Price</th>
                                    <th className='border border-gray-400 text-gray-600 border-1px w-1/2'>Points</th>
                                </thead>
                                <tbody className='flex flex-col w-1/3 justify-around'>
                                    {offers.map((val , i)=>{
                                        return(
                                            <tr className='flex w-full justify-around'>
                                                <td className='text-center border border-gray-400 text-gray-600 border-1px h-full w-1/2'>{val.offer.cost}</td>
                                                <td className='text-center border border-gray-400 text-gray-600 border-1px h-full w-1/2'>{val.offer.points}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
        )
    }else{
        return (
            <div className='flex flex-col'>
            <div className='flex justify-around'>
                <div className='flex flex-col items-center m-6 p-6'>
                    <h2 className='text-black text-2xl'>Add points package</h2>
                    <form onSubmit={e=>addSubmitHandler(e)}>
                        <div className='flex flex-col my-12'>
                            <label>Cost</label>
                            <input onChange={e=>setCost(e.target.value)} className='h-8 p-1 rounded-lg border border-solid border-1px border-black' type={'number'} />
                        </div>
                        <div className='flex flex-col my-12'>
                            <label>Points</label>
                            <input onChange={e=>setPoints(e.target.value)} className='h-8 p-1 rounded-lg border border-solid border-1px border-black' type={'number'} />
                        </div>
                        <div className='flex flex-col'>
                            <input className='bg-indigo-500 hover:bg-indigo-600 p-1 w-20 rounded-lg text-white' type={'submit'}/>
                            <label className='my-6'>{addResponse}</label>
                        </div>
                    </form>
                </div>
                <div className='flex flex-col items-center m-6 p-6'>
                    <h2 className='text-black text-2xl'>Delete points package</h2>
                    <form onSubmit={e=>deleteSubmitHandler(e)}>
                        <div className='flex flex-col my-12'>
                            <label>Points Package Cost</label>
                            <input onChange={e=>setDeleteCost(e.target.value)} className='h-8 p-1 rounded-lg border border-solid border-1px border-black' type={'number'} />
                        </div>
                        <div className='flex flex-col'>
                            <input className='bg-indigo-500 hover:bg-indigo-600 p-1 w-20 rounded-lg text-white' type={'submit'}/>
                            <label className='my-6'>{deleteResponse}</label>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default PointsPackages ;