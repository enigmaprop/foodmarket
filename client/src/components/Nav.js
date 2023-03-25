import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Cookies from 'js-cookie';

const Nav = (parms) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-6 bg-white">
      <div className="flex items-center flex-shrink-0 mr-6">
        <h1 className="text-3xl font-bold text-gray-700"><Link to="/">Mall</Link></h1>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-gray-900 hover:border-gray-900"
          onClick={handleToggle}
          aria-label="Toggle navigation menu"
        >
          {showMenu ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } w-full lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-lg lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-4"
            onClick={handleToggle}
          >
            الرئيسية
          </Link>
          <Link
            to="/catagories"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-4"
            onClick={handleToggle}
          >
            الاصناف
          </Link>
          <Link
            to="/cart"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900"
            onClick={handleToggle}
          >
            السلة
          </Link>
          {Cookies.get("id") ? <Link
            to="/profile"
            className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900"
            onClick={handleToggle}
          >
            الحساب
          </Link> : (<Link
            to="/login"
            className="block mt-4 ml-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900"
            onClick={handleToggle}
          >
            تسجيل الدخول
          </Link>)}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
