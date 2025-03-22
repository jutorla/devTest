import React, { useState, useContext, useEffect } from "react";
import { postCart } from "../utils/api";
import { CartContext } from "../context/CartContext";
import productDetailsFields from "../constants/products";
import colorMapping from "../constants/colors"; 

const ProductDetails = ({ product, onBack }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setCartCount } = useContext(CartContext);

  useEffect(() => {
    if (product.options.colors.length === 1) {
      setSelectedColor(product.options.colors[0].code);
    }
    if (product.options.storages.length === 1) {
      setSelectedStorage(product.options.storages[0].code);
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (selectedColor && selectedStorage) {
      setIsLoading(true);
      const result = await postCart(product.id, selectedColor, selectedStorage);
      setIsLoading(false);
      if (result && result.count !== undefined) {
        setCartCount(result.count);
      }
    } else {
      alert("Please select a color and storage option.");
    }
  };

  const productDetails = productDetailsFields(product);

  return (
    <div className="p-4 flex justify-center">
      <div className="bg-green-200 p-6 flex flex-col md:flex-row gap-6 items-center justify-center w-full h-full rounded-xl">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-48 md:left-12 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <div className="bg-gray-200 p-0 flex items-center justify-center rounded shadow w-full md:w-80 h-80">
          <img src={product.imgUrl} className="w-full h-full rounded" />
        </div>
        <div className="flex flex-col gap-6 items-center justify-center w-full md:w-auto">
          <div className="bg-white p-4 rounded shadow w-full md:w-[250px]">
            <h3 className="text-lg font-semibold text-center">DESCRIPTION</h3>
            <ul className="list-disc pl-4 mt-2 text-gray-600">
              {productDetails.map((detail) => (
                <li key={detail.label}>
                  {detail.label}: {detail.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow w-full md:w-[250px]">
            <h3 className="text-lg font-semibold text-center">ACTIONS</h3>
            <div className="flex flex-col gap-2 mt-2 justify-center">
              <div className="flex flex-wrap gap-2">
                {product.options.colors.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => setSelectedColor(color.code)}
                    className={`p-2 rounded ${selectedColor === color.code ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  >
                    <div
                      style={{ backgroundColor: colorMapping[color.name] || color.name.toLowerCase(), width: '20px', height: '20px', borderRadius: '50%' }}
                    ></div>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.options.storages.map((storage) => (
                  <button
                    key={storage.code}
                    onClick={() => setSelectedStorage(storage.code)}
                    className={`p-2 rounded ${selectedStorage === storage.code ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  >
                    {storage.name}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full h-10 bg-gray-300 rounded mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;