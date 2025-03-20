import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="m-4 bg-blue-300 p-4 text-center text-lg font-semibold">
      <Link to="/home" className="text-white">
        HEADER
      </Link>
    </header>
  );
};

export default Header;