import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProductById } from "../utils/api";
import { CartContext } from '../context/CartContext';

const CACHE_DURATION = 3600000;

const setCache = (key, data) => {
  const cacheData = {
    data,
    expiry: Date.now() + CACHE_DURATION,
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

const Header = () => {
  const [breadcrumbNames, setBreadcrumbNames] = useState();
  const { cartCount } = useContext(CartContext);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    const fetchNames = async () => {
      if (pathnames.length) {
        const cacheKey = `breadcrumb_${pathnames[0]}`;
        const cachedData = getCache(cacheKey);
        if (cachedData) {
          setBreadcrumbNames(cachedData.brand + " " + cachedData.model);
          return;
        }

        const data = await getProductById(pathnames[0]);
        setBreadcrumbNames(data.brand + " " + data.model);
        setCache(cacheKey, data);
      }
    };
    fetchNames();
  }, [pathnames]);

  return (
    <header className="m-4 bg-blue-300 p-4 text-center text-lg font-semibold">
      <Link to="/" className="text-white">
        MOBILE STORE
      </Link>
      <div className="flex items-right">
        <span>Items in cart: {cartCount}</span>
        <nav className="ml-20">
        {pathnames.length > 0 ? (
          <div className="text-white">
            <Link to="/" className="text-white">
              Home
            </Link>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <span key={to}>
                  {" > "}
                  <Link to={to} className="text-white">
                    {breadcrumbNames}
                  </Link>
                </span>
              );
            })}
          </div>
        ) : null}
      </nav>
      </div>

    </header>
  );
};

export default Header;