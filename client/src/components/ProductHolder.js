import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductHolder = (parms) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const lineThrough = {
    textDecoration: "line-through",
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // defining the id
  const id = useParams().id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${parms.url}products/byId/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id, parms]);

  const handleBuyButton = (e) => {
    const name = product.name;
    var price
    if(product.discount > 0){
      price = product.price - product.discount * product.price;
    }else{
      price = product.price;
    }

    var items = [];

    const buyButton = document.getElementById('buy');
    buyButton.style.backgroundColor = 'green'
    buyButton.innerText = 'Added successfully'
    if (typeof Cookies.get(parms.cartName) === "string") {
      items = Cookies.get(parms.cartName);
      items = JSON.parse(items);
    } else {
      items = [];
    }

    if (typeof items === "object") {
      items.push(
        JSON.stringify({
          id: id,
          name: name,
          quantity: quantity,
          price: price,
          img: `${parms.url}images/${product.image.name}`,
        })
      );
      items = JSON.stringify(items);
    } else {
      items = JSON.stringify([
        {
          id: id,
          name: name,
          quantity: quantity,
          price: price,
          img: `${parms.url}images/${product.image.name}`,
        },
      ]);
    }
    const newitems = items;

    Cookies.set(parms.cartName, newitems);
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Image */}
        <h1 className="text-right text-2">{product.name}</h1>
 <div className="md:flex md:flex-wrap md:-mx-4">
 <div className="md:w-1/2 md:px-4">
   <img
     src={`${parms.url}images/${product.image.name}`}
     alt=""
     className="w-full"
   />
 </div>
 <div className="md:w-1/2 md:px-4">
   <div className="mb-4">
     <h2 className="font-bold text-2xl mb-2">{product.name}</h2>
     <div className="text-xl mb-2">
  {product.discount > 0 ? (
    <>
      {(product.price - product.discount * product.price).toFixed(2)}
      <span className="ml-2 text-gray-600 text-sm" style={lineThrough}>
        {(product.price).toFixed(2)}
      </span>
    </>
  ) : (
  (product.price).toFixed(2)
  )}
</div>
     <p className="text-gray-700">{product.description}</p>
   </div>
   <div className="mb-4">
     <label className="font-bold mb-2" htmlFor="quantity">
       Quantity
     </label>
     <input
       className="appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="quantity"
       type="number"
       min="1"
       max={product.stock}
       value={quantity}
       onChange={handleQuantityChange}
     />
   </div>
   <button
     id="buy"
     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
     onClick={handleBuyButton}
   >
     Buy Now
   </button>
 </div>
</div>
</div>
);
}
};

export default ProductHolder;