import React from "react";
import { Link } from "react-router-dom";

const ProductSnap = ( product ) => {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-gray-200 p-4 rounded shadow hover:bg-gray-300 transition">
        <img src={product.imgUrl} className="w-auto h-auto object-cover" alt={product.model} />
        <h3 className="text-lg font-semibold">{product.brand}</h3>
        <p className="text-gray-600">{product.model}</p>
        <p className="text-blue-500 font-bold">{product.price} €</p>
      </div>
    </Link>
  );
};

export default ProductSnap;