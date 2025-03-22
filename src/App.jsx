import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import "./styles/tailwind.css";
import Header from "./components/Header"; 

export default function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}