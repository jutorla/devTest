import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, postCart } from "../utils/api";
import { CartContext } from "../context/CartContext";
import productDetailsFields from "../constants/products";

const CACHE_EXPIRATION = 60 * 60 * 1000;

const setCache = (key, data) => {
  const cacheData = {
    data,
    expiry: Date.now() + CACHE_EXPIRATION,
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

const getCache = (key) => {
  const cacheData = JSON.parse(localStorage.getItem(key));
  if (!cacheData) return null;
  if (Date.now() > cacheData.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return cacheData.data;
};

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const { setCartCount } = useContext(CartContext);

  useEffect(() => {
    const cachedData = getCache(`product_${productId}`);
    if (cachedData) {
      setData(cachedData);
      if (cachedData.options.colors.length === 1) {
        setSelectedColor(cachedData.options.colors[0].code);
      }
      if (cachedData.options.storages.length === 1) {
        setSelectedStorage(cachedData.options.storages[0].code);
      }
      return;
    }

    const fetchData = async () => {
      const result = await getProductById(productId);
      setData(result);
      setCache(`product_${productId}`, result);
      if (result.options.colors.length === 1) {
        setSelectedColor(result.options.colors[0].code);
      }
      if (result.options.storages.length === 1) {
        setSelectedStorage(result.options.storages[0].code);
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = async () => {
    if (selectedColor && selectedStorage) {
      const result = await postCart(data.id, selectedColor, selectedStorage);
      if (result && result.count !== undefined) {
        setCartCount(result.count);
      }
    } else {
      alert("Please select a color and storage option.");
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const productDetails = productDetailsFields(data);

  return (
    <div className="p-4 flex justify-center">
      <div className="bg-green-200 p-6 flex flex-col md:flex-row gap-6 items-center justify-center w-full h-full">
        <button
          onClick={() => navigate('/')}
          className="absolute top-48 left-12 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <div className="bg-gray-200 p-0 flex items-center justify-center rounded shadow w-80 h-80">
          <img src={data.imgUrl} className="w-full h-full rounded" />
        </div>
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="bg-white p-4 rounded shadow w-[250px]">
            <h3 className="text-lg font-semibold text-center">DESCRIPTION</h3>
            <ul className="list-disc pl-4 mt-2 text-gray-600">
              {productDetails.map((detail) => (
                <li key={detail.label}>
                  {detail.label}: {detail.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow w-[250px]">
            <h3 className="text-lg font-semibold text-center">ACTIONS</h3>
            <div className="flex flex-col gap-2 mt-2 justify-center">
              <div className="flex flex-wrap gap-2">
                {data.options.colors.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => setSelectedColor(color.code)}
                    className={`p-2 rounded ${selectedColor === color.code ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  >
                    <div
                      style={{ backgroundColor: color.name.toLowerCase(), width: '20px', height: '20px', borderRadius: '50%' }}
                    ></div>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.options.storages.map((storage) => (
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
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;