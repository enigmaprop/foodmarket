import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginForm(parms) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post(`${parms.url}admin/login` , {name , password} , {
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      }
    })
    console.log(response.data);
    if(response.data.success){
      
      Cookies.set(parms.pubkey , response.data.key  , {
        secure: true ,
        sameSite: 'Strict' ,
        expires: 7 ,
      });
      window.location.replace('/admin')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-64">
      <label className="mb-2 font-bold text-gray-700" htmlFor="name">
        Name
      </label>
      <input
        className="border border-gray-400 p-2 mb-4 rounded-md"
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label className="mb-2 font-bold text-gray-700" htmlFor="password">
        Password
      </label>
      <input
        className="border border-gray-400 p-2 mb-4 rounded-md"
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
