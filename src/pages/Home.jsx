import { useState, useEffect } from "react";
import ProductSnap from "../components/ProductSnap";
import { getProducts } from "../utils/api";

const CACHE_KEY = "products_cache";
const CACHE_EXPIRATION = 3600000;

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRATION) {
            setProducts(data);
            setFilteredProducts(data);
            setLoading(false);
            return;
          }
        }
        const result = await getProducts();
        setProducts(result);
        setFilteredProducts(result);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, timestamp: Date.now() }));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.model.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [search, products, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <div className="bg-green-200 p-6">
        <div className="flex justify-end items-center mb-4">
          <div className="flex bg-gray-200 items-center space-x-2">
            <input
              type="text"
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
              className="border p-2 rounded"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {currentProducts.map((product) => (
              <ProductSnap key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            className="bg-gray-300 px-4 py-2 rounded"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2  hover:bg-blue-200 border-round-500 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
            className="bg-gray-300 px-4 py-2 rounded"
            disabled={currentPage === pageNumbers.length}
          >
           {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
};