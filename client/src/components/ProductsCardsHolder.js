import React from "react";

const ProductsCardsHolder = ({ categoryName, productList , url}) => {
  const imagesLink = `${url}images/`;
  const products = productList;
  products.reverse();

  const handleImageLoad = (e) => {
    e.target.style.opacity = 1;
  };

  const lineThrough = {
    textDecoration: "line-through",
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold mb-5 text-black text-center">
        {categoryName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => {
        return(
          
          <div key={product.id} className="bg-white rounded-lg shadow-md">
            {product.image && (
              <img
                src={`${imagesLink}${product.image.name}`}
                alt={product.name}
                className="h-48 w-full object-cover rounded-t-lg"
                onLoad={handleImageLoad}
              />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-700 text-base mb-4">{product.discount > 0 ? (
    <>
      {(product.price - product.discount * product.price)}
      <span className="ml-2 text-gray-600 text-sm" style={lineThrough}>
        {(product.price)}
      </span>
    </>
  ) : (
  (product.price)
  )}</p>
              <button
                onClick={(e) =>
                  (window.location.href = `/products/${product.id}`)
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default ProductsCardsHolder;
