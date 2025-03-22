import { useState, useEffect, useContext } from "react";
import ProductSnap from "../components/ProductSnap";
import ProductDetails from "./ProductDetails";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { getProducts, getProductById } from "../utils/api";
import { CartContext } from '../context/CartContext';

const PRODUCTS_CACHE_KEY = "products_cache";
const PRODUCT_CACHE_KEY_PREFIX = "product_cache_";
const CACHE_EXPIRATION = 3600000;

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

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [breadcrumbNames, setBreadcrumbNames] = useState();
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cachedData = getCache(PRODUCTS_CACHE_KEY);
        if (cachedData) {
          setProducts(cachedData);
          setFilteredProducts(cachedData);
          setLoading(false);
          return;
        }
        const result = await getProducts();
        setProducts(result);
        setFilteredProducts(result);
        setCache(PRODUCTS_CACHE_KEY, result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const combinedString = `${product.brand} ${product.model}`.toLowerCase();
      return combinedString.includes(search.toLowerCase());
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [search, products, loading]);

  const handleProductClick = async (productId) => {
    setLoading(true);
    try {
      const cacheKey = `${PRODUCT_CACHE_KEY_PREFIX}${productId}`;
      const cachedProduct = getCache(cacheKey);
      if (cachedProduct) {
        setSelectedProduct(cachedProduct);
        setBreadcrumbNames(`${cachedProduct.brand} ${cachedProduct.model}`);
        setLoading(false);
        return;
      }
      const product = await getProductById(productId);
      setSelectedProduct(product);
      setBreadcrumbNames(`${product.brand} ${product.model}`);
      setCache(cacheKey, product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setBreadcrumbNames(null);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <Header breadcrumbNames={breadcrumbNames} cartCount={cartCount} onClickHome={handleBackToProducts}/>
      <div className="bg-green-200 p-6 rounded-xl">
        <div className="flex justify-end items-center mb-4">
          {!selectedProduct && (
            <div className="flex bg-gray-200 items-center space-x-2 w-full md:w-auto">
              <input
                type="text"
                value={search}
                onChange={({ target: { value } }) => setSearch(value)}
                className="border p-2 rounded w-full md:w-auto"
                placeholder="Search..."
              />
            </div>
          )}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : selectedProduct ? (
          <ProductDetails product={selectedProduct} onBack={handleBackToProducts} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <ProductSnap key={product.id} product={product} onClick={() => handleProductClick(product.id)} />
            ))}
          </div>
        )}
        {!selectedProduct && !loading && (
          <div className="flex justify-center mt-4">
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}