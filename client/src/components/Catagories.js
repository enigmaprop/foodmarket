import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Categories = (parms) => {

  const [categories , setCategories] = useState([]);

  useEffect(()=>{
    const getCategories = async()=>{
      const response = await axios.get(`${parms.url}categories/`);
      const data = response.data;
      setCategories(data);
    }
    getCategories();
  } , [parms])
  if(categories.length !== 0){
    return (
      <div className="container mx-auto px-4 flex flex-col ">
        <h1 className='text-5xl mb-16 text-center'>الاصناف</h1>
        <div className="flex flex-wrap -mx-2">
          {categories.map((category) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mb-4">
              <div className="relative h-36 rounded-lg overflow-hidden">
                  <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={`${parms.url}images/${category.image.name}`}
                      alt={category.name}
                  />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
                <div className="absolute inset-0 p-4 flex items-center justify-center">
                <Link to={`/catagories/${category.name}`}><h3 className="text-white text-lg font-bold text-center">{category.name}</h3></Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }else{
    return <div>Loading ...</div>
  }
};

export default Categories;
