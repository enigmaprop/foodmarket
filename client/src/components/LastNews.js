import React, { useEffect, useState } from 'react';
import axios from 'axios';
const LastNews = (parms)=>{

    const [news , setNews] = useState('! اهلا وسهلا بمتجرنا , نتمنى لكم يوما سعيدا')

    useEffect(()=>{
        const getNews = async()=>{
            const news = await axios.get(`${parms.url}news/getNews`);
            setNews(news.data);
        }

        setInterval(()=>{
            getNews();
        } , 10000)
    } , [parms])

    return(
        <div className='flex flex-col justify-between items-center'>
            <h1 className='mb-20 text-4xl font-bold'>اخر الاحداث</h1>
            <div className='flex flex-row-reverse justify-between w-full h-[20vh] bg-gray-100 rounded-lg'>
                
                <div className='flex flex-row-reverse justify-center items-center h-full p-6'>
                    <div className='w-1 h-[90%] bg-gray-700 rounded-sm mx-3'> </div>
                    <div className='w-1 h-2/3 bg-gray-700 rounded-sm '> </div>
                    <div className='w-1 h-1/3 bg-gray-700 mx-3 rounded-sm'> </div>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-xl text-center font-bold text-gray-600'>{news}</p>
                </div>
                <div className='flex justify-center items-center h-full p-6'>
                    <div className='w-1 h-[90%] bg-gray-700 rounded-sm mx-3'> </div>
                    <div className='w-1 h-2/3 bg-gray-700 rounded-sm '> </div>
                    <div className='w-1 h-1/3 bg-gray-700 mx-3 rounded-sm'> </div>
                </div>
            </div>
        </div>
    )
}

export default LastNews;