import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="w-full flex justify-center">
      <ul className="flex flex-wrap space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            className="bg-gray-300 px-2 py-1 md:px-4 md:py-2 rounded"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-2 py-1 md:px-4 md:py-2 hover:bg-blue-200 mb-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
            className="bg-gray-300 px-2 py-1 md:px-4 md:py-2 rounded"
            disabled={currentPage === pageNumbers.length}
          >
           {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;