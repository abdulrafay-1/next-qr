"use client"
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { colors } from "../src/constants/QrConstant"
import qrDownload from "@/src/utils/qrDownload";
import fbLogo from "../src/images/fbLogo.png"
const Home = () => {
  const [input, setInput] = useState("");
  const [debounceText, setDebounceText] = useState("");
  const [activeColor, setActiveColor] = useState("#000")
  const qrcodeRef = useRef<SVGSVGElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceText(input);
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDownloadDropdown(false);
      }
    }

    if (showDownloadDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDownloadDropdown]);

  const handleDownloadDropdown = () => {
    setShowDownloadDropdown(!showDownloadDropdown)
  }

  const handleQrDownload = (type: string) => {
    setShowDownloadDropdown(false)
    if (!debounceText) return;
    qrDownload(qrcodeRef, type)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">QR Code Generator</h1>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            value={input}
            required={true}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text or URL"
          />
          <div className="flex justify-center items-center flex-wrap gap-2 py-3">
            <p>Colors :</p>
            {colors.map((item, index) => <div
              key={index}
              onClick={() => setActiveColor(item)}
              className={`px-4 py-4 cursor-pointer rounded-md  ${activeColor === item && "outline outline-white"}`}
              style={{ backgroundColor: item }}></div>)}
          </div>
          <div className="mt-4 flex justify-center">
            <QRCodeSVG
              ref={qrcodeRef}
              size={156}
              value={debounceText}
              fgColor={activeColor}
              marginSize={1}
              // imageSettings={{ src: "./fbLogo.png", width: 30, height: 30, excavate: true }}
              className="shadow-md bg-white rounded-md "
            />
          </div>
          <div className="relative">
            <div className="relative">
              <button
                onClick={handleDownloadDropdown}
                className="mt-4 w-full bg-blue-500 flex justify-center hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
              >
                <p className="flex-1">Download QR Code</p>
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

              </button>

              {/* Dropdown Menu */}
              {showDownloadDropdown && (
                <div ref={dropdownRef} className="absolute left-1/2 -translate-x-1/2 w-[180px] mt-2 bg-blue-600 rounded-md shadow-lg overflow-hidden animate-fadeIn">
                  <button
                    onClick={() => handleQrDownload("svg")}
                    className="w-full px-4 py-1 text-center">
                    PNG
                  </button>
                  <button
                    onClick={() => handleQrDownload("")}
                    className="w-full px-4 py-1 text-center">
                    SVG
                  </button>
                </div>
              )}
            </div>

          </div></form>
      </div>
    </div >
  );
};

export default Home;

