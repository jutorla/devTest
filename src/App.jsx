import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import "./styles/tailwind.css";
import Header from "./components/Header"; 

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
      <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}