import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
function LoginForm(parms) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [response , setResponse] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        phoneNumber : phone ,
        password ,
    }
    axios.post(`${parms.url}user/login` , data , {
        headers:{
            "Content-Type":'application/x-www-form-urlencoded' ,
        }
    }).then((val)=>{
      setResponse(val.data.msg);
      console.log(val.data);
      if(val.data.user){
        Cookies.set('id' , val.data.user.id , {
          secure: true ,
          sameSite: 'Strict' ,
          expires: 7 ,
        });
        window.location.replace('/profile')
      }
    })
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
          رقم الهاتف
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
          placeholder="أدخل رقم هاتفك"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          كلمة المرور
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
          placeholder="أدخل كلمة المرور التي تريدها"
          required
        />
      </div>
      <div className='flex flex-col'>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          تأكيد
        </button>
        <label className='mt-3'>{response}</label>
      </div>
    </form>
    <Link
     to={'/signup'}
     className="block my-6 mx-6 p-2 bg-indigo-500 w-28 hover:bg-indigo-600 text-center text-white rounded-lg "
    >حساب جديد</Link>
    </div>
  );
}

export default LoginForm;
