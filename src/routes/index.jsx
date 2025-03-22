import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import "tailwindcss/tailwind.css";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
