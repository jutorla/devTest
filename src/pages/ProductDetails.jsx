import React from "react";

const productMock={"id":"ZmGrkLRPXOTpxsU4jjAcv","brand":"Acer","model":"Iconia Talk S","price":"170",
  "imgUrl":"https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg","networkTechnology":"GSM / HSPA / LTE",
"networkSpeed":"HSPA 42.2/11.5 Mbps  LTE Cat4 150/50 Mbps","gprs":"Yes","edge":"Yes","announced":"2016  August",
"status":"Available. Released 2016  October","dimentions":"191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)","weight":"260","sim":"Dual SIM (Micro-SIM/Nano-SIM)",
"displayType":"IPS LCD capacitive touchscreen  16M colors","displayResolution":"7.0 inches (~69.8% screen-to-body ratio)",
"displaySize":"720 x 1280 pixels (~210 ppi pixel density)","os":"Android 6.0 (Marshmallow)","cpu":"Quad-core 1.3 GHz Cortex-A53","chipset":"Mediatek MT8735",
"gpu":"Mali-T720MP2","externalMemory":"microSD  up to 128 GB (dedicated slot)","internalMemory":["16 GB","32 GB"],"ram":"2 GB RAM","primaryCamera":["13 MP","autofocus"],
"secondaryCmera":["2 MP","720p"],"speaker":"Yes","audioJack":"Yes","wlan":["Wi-Fi 802.11 a/b/g/n","Wi-Fi Direct","hotspot"],"bluetooth":["4.0","A2DP"],
"gps":"Yes with A-GPS GLONASS","nfc":"","radio":"FM radio","usb":"microUSB 2.0","sensors":["Accelerometer","proximity"],
"battery":"Non-removable Li-Ion 3400 mAh battery (12.92 Wh)","colors":["Black"],"options":{"colors":[{"code":1000,"name":"Black"}],
"storages":[{"code":2000,"name":"16 GB"},{"code":2001,"name":"32 GB"}]}}

const ProductDetails = ( product ) => {

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="bg-green-200 p-6 flex flex-col md:flex-row gap-6 items-center justify-center w-full h-full">
        <div className="bg-gray-200 p-6 flex items-center justify-center rounded shadow w-[300px] h-[250px]">
          <img src={productMock.imgUrl} className="w-full h-auto rounded" />
        </div>
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="bg-white p-4 rounded shadow w-[250px]">
            <h3 className="text-lg font-semibold text-center">DESCRIPTION</h3>
            <ul className="list-disc pl-4 mt-2 text-gray-600">
              <li>Brand: {productMock.brand}</li>
              <li>Model: {productMock.model}</li>
              <li>Price: {productMock.price}</li>
              <li>CPU: {productMock.cpu}</li>
              <li>OS: {productMock.os}</li>
              <li>Display: {productMock.displaySize}</li>
              <li>Battery: {productMock.battery}</li>
              <li>Camera: {productMock.primaryCamera}</li>
              <li>Size: {productMock.displaySize}</li>
              <li>Weight: {productMock.weight}</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow w-[250px]">
            <h3 className="text-lg font-semibold text-center">ACTIONS</h3>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              <button className="w-10 h-10 bg-gray-300 rounded"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
