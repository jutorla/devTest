import { useState } from "react";
import ProductSnap from "../components/ProductSnap";
const products = [
  {"id":"ZmGrkLRPXOTpxsU4jjAcv","brand":"Acer","model":"Iconia Talk S","price":"170","imgUrl":"https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg"},
    { id: 1, name: "Phone1", price: "900€", description: "Description1 " },
    { id: 1, name: "Phone1", price: "900€", description: "Description1" },
    { id: 1, name: "Phone1", price: "900€", description: "Description1" },
    { id: 1, name: "Phone1", price: "900€", description: "Description1" },
    { id: 1, name: "Phone1", price: "900€", description: "Description1" },
    { id: 1, name: "Phone1", price: "900€", description: "Description1" },
    { id: 1, name: "Phone1", price: "900€", description: "Description1" },
  ];
  

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <div className=" p-4 min-h-screen bg-gray-100">
      <div className="bg-green-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">LIST VIEW</h2>
          <div className="flex items-center space-x-2">
            SEARCH 
            <input
              type="text"
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
              className="border p-2 rounded">
              </input>
            <button className="bg-red-300 px-4 py-2 rounded">SEARCH</button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gray-200 p-6 text-center rounded shadow"
            >
              {ProductSnap(product)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
