import { useState } from 'react';
import axios from 'axios';

function SignUpForm(parms) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [response , setResponse] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        phoneNumber : phone ,
        name ,
        password ,
    }
    axios.post(`${parms.url}user/addUser` , data , {
        headers:{
            "Content-Type":'application/x-www-form-urlencoded' ,
        }
    }).then((val)=>{
      setResponse(val.data);
      console.log(val.data === 'تمت اضافة المستخدم بنجاح');
      if(val.data === 'تمت اضافة المستخدم بنجاح'){
        window.location.replace('/login')
      }
    })
  };

  return (
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
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          الاسم
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
          placeholder="أدخل اسمك هنا"
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
      <div className='my-5'>
        <label className='mr-5'>اوافق على شروط الخدمة </label>
        <input required type='checkbox'/>
      </div>
      <div className='flex flex-col'>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          سجل هنا
        </button>
        <label className='mt-3'>{response}</label>
      </div>
    </form>
  );
}

export default SignUpForm;
