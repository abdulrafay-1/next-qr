"use client"
import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import qrDownload from "./utils/qrDownload";

const Home = () => {
  const [input, setInput] = useState("");
  const [debounceText, setDebounceText] = useState("");
  const [activeColor, setActiveColor] = useState("")
  const qrcodeRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceText(input);
    }, 400);
    return () => clearTimeout(timer);
  }, [input]);

  const handleQrDownload = () => qrDownload(qrcodeRef);

  const colors = [
    "#4CAF50",
    "#2196F3",
    "#9C27B0",
    "#FFC107",
    "#FF4081",
    "#FF5722",

  ];



  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">QR Code Generator</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text or URL"
        />
        <div className="flex justify-center items-center flex-wrap gap-2 py-3">
          <p>Colors :</p>
          {colors.map(item => <div
            onClick={() => setActiveColor(item)}
            className={`px-5 py-4 cursor-pointer rounded-md  ${activeColor === item && "outline outline-white"}`}
            style={{ backgroundColor: item }}></div>)}
        </div>
        <div className="mt-4 flex justify-center">
          <QRCodeCanvas
            ref={qrcodeRef}
            size={128}
            value={debounceText}
            // bgColor={activeColor}
            fgColor={activeColor}
            marginSize={1}
            level="L"
            className="shadow-md bg-white rounded-md"
          />
        </div>
        <button
          onClick={handleQrDownload}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default Home;