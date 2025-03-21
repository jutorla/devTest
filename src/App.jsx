import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import "./styles/tailwind.css";
import Header from "./components/Header"; 

export default function App() {
  return (
    <Router>
      <div className="">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}