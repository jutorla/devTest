import React from "react";
import { Link } from "react-router-dom";

const ProductSnap = ({ product }) => {
  return (
    <Link to={`/${product.id}`} className="block">
      <div className="p-2 w-70 h-80 transition flex flex-col items-center justify-center">
        <img src={product.imgUrl} className="w-auto h-auto" alt={product.model} />
        <h3 className="text-lg font-semibold">{product.brand}</h3>
        <p className="text-gray-600">{product.model}</p>
        <p className="text-blue-500 font-bold">{product.price ? `${product.price} €` : 'TBD'}</p>
      </div>
    </Link>
  );
};

export default ProductSnap;