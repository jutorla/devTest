import React from "react";

const Header = ({ breadcrumbNames, cartCount, onClickHome }) => {
  return (
    <div className={`text-center text-lg font-semibold mb-4`}>
      <div className="bg-blue-300 p-4 text-center text-lg font-semibold rounded-xl">
        <button onClick={()=>onClickHome()} className="text-white bg-transparent border-none cursor-pointer">
          MOBILE STORE
        </button>
        <div>Items in cart: {cartCount}</div>
      <div className="flex justify-center h-4">
        <div>
          {breadcrumbNames ? (
            <nav className="text-black bg-red-200">
              <button onClick={()=>onClickHome()} className="text-black bg-transparent border-none cursor-pointer">
                Home
              </button>
              <span>
                {" > "}
                <span className="text-black">{breadcrumbNames}</span>
              </span>
            </nav>
          ) : null}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;