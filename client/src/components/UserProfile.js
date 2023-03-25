import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";

const UserProfile = (parms) => {

  const [showPassword, setShowPassword] = useState(false);


  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div className="p-4">
        <h1 className="text-2xl font-bold">{parms.user.name}</h1>
        <p className="text-gray-500">{parms.user.phoneNumber}</p>
      </div>
      <div className="px-4 py-2 bg-gray-100">
        <div className="flex items-center">
          <label className="mr-2 text-gray-600 font-medium">كلمة السر:</label>
          <div className="relative flex-grow">
            <input
              type={showPassword ? "text" : "password"}
              value={parms.user.password}
              readOnly
              className="w-full border rounded px-2 py-1 text-gray-600 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute right-0 top-0 bottom-0 flex items-center px-2"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <label className="mr-2 text-gray-600 font-medium">نقاطك:</label>
          <p className="text-gray-700">{parms.user.points}</p>
        </div>
        <div className="mt-2 flex items-center justify-around">
          <label className="mr-2 text-gray-600 font-medium">الخصوم:</label>
          <ul className="list-disc list-inside">
            {parms.user.discounts.map((discount) => (
              <li key={discount} className="text-gray-700">
                {discount}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <button onClick={e=>{
          Cookies.remove(parms.id)
          window.location.replace('/')
          }} className="my-12 ml-5 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">تسجيل الخروج</button>
      </div>
    </div>
  );

};

export default UserProfile;
