import React from 'react';
import { Link } from 'react-router-dom';
const Handle404Page = ()=>{
    return(
        <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw]'>
            <h1 className='text-center text-4xl text-indigo-800'>Page not found 404</h1>
            <div className='m-12'>
                <Link 
                 to={'/'}
                 className="text-white text-lg bg-indigo-500 hover:bg-indigo-600 p-2 mx-8 rounded-lg"
                >
                    Go to Home page
                </Link>
            </div>
        </div>
    )
}

export default Handle404Page;