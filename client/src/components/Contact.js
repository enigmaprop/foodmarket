import React from 'react';
import { useState } from 'react';

const Contact = ()=>{
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [subject , setSubject] = useState('');
    const [message , setMessage] = useState('');

    const submitHandler = (e)=>{
        e.preventDefault()
        const contactInfo = {firstName , lastName , email , subject , message}

    }

    return(
        <form onSubmit={submitHandler}>
            <div className='m-5 flex flex-col items-center justify-center'>
                <label>First Name</label>
                <input onChange={(e)=>setFirstName(e.target.value)} className='border-solid border-gray-600 border-2 rounded-md p-1 h-9 w-1/2' type="text" />
            </div>
            <div className='m-5 flex flex-col  items-center justify-center'>
                <label>Last Name</label>
                <input onChange={(e)=>setLastName(e.target.value)} className='border-solid border-gray-600 border-2 rounded-md p-1 h-9 w-1/2' type="text"/>
            </div >
            <div className='m-5 flex flex-col items-center justify-center'>
                <label>Email</label>
                <input onChange={e=>{setEmail(e.target.value)}} className='border-solid border-gray-600 border-2 rounded-md p-1 h-9 w-1/2' type="email"/>
            </div>
            <div className='m-5 flex flex-col items-center justify-center'>
                <label>Subject</label>
                <input onChange={e=>setSubject(e.target.value)} className='border-solid border-gray-600 border-2 rounded-md p-1 h-9 w-1/2' type="text"/>
            </div>
            <div className='m-5 flex flex-col items-center justify-center'>
                <label>Message</label>
                <textarea onChange={e=>setMessage(e.target.value)} className='h-36 w-1/2 p-1 border-solid border-gray-600 border-2 rounded-md' value={'hello'} />
            </div>
            <div className='flex justify-center items-center'>
                <input type='submit' className='m-8 bg-indigo-500 w-24 text-white rounded-lg h-10 p-1'/>
            </div>
        </form>
    )
}

export default Contact ;