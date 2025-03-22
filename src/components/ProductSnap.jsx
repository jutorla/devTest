import React from "react";

const ProductSnap = ({ product, onClick }) => {
  return (
    <div onClick={onClick} className="block cursor-pointer">
      <div className="p-2 w-auto h-auto transition flex flex-col items-center justify-center">
        <img src={product.imgUrl} className="max-w-full h-auto" alt={product.model} />
        <h3 className="text-lg font-semibold">{product.brand}</h3>
        <p className="text-gray-600">{product.model}</p>
        <p className="text-blue-500 font-bold">{product.price ? `${product.price} €` : 'TBD'}</p>
      </div>
    </div>
  );
};

export default ProductSnap;