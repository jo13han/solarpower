"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowNavbar(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section>
        {showNavbar && (
          <nav className="flex justify-center items-center absolute top-0 left-0 right-0 bg-transparent py-4 z-10">
            <button
              className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 mr-4 ${
                hoveredButton === "process" ? "" : ""
              }`}
              onMouseEnter={() => setHoveredButton("process")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Process
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === "process"
                    ? "transform scale-x-100"
                    : "transform scale-x-0"
                }`}
              ></span>
            </button>
            <button
              className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 mr-4 ${
                hoveredButton === "services" ? "" : ""
              }`}
              onMouseEnter={() => setHoveredButton("services")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Services
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === "services"
                    ? "transform scale-x-100"
                    : "transform scale-x-0"
                }`}
              ></span>
            </button>
            <button
              className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 ${
                hoveredButton === "connect" ? "" : ""
              }`}
              onMouseEnter={() => setHoveredButton("connect")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Connect
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === "connect"
                    ? "transform scale-x-100"
                    : "transform scale-x-0"
                }`}
              ></span>
            </button>
            <Link href={"/map"}>
              <button
                className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 ${
                  hoveredButton === "connect" ? "" : ""
                }`}
                onMouseEnter={() => setHoveredButton("connect")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Take Me There!
                <span
                  className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                    hoveredButton === "connect"
                      ? "transform scale-x-100"
                      : "transform scale-x-0"
                  }`}
                ></span>
              </button>
            </Link>
          </nav>
        )}
        <div className="relative w-full h-[90vh] flex flex-row justify-center overflow-hidden">
          <video
            className="w-full absolute"
            muted={true}
            autoPlay={true}
            loop={true}
            preload="auto"
            src="/hero_video.mp4"
          ></video>
          <h1 className="text-5xl text-white absolute bottom-28 font-bold">
            Build Your Green Future With Solar Energy!
          </h1>
        </div>
      </section>
      <section>
        <div className="bg-black text-white py-8">
          <div className="flex justify-center">
            <div className="w-70 h-40 flex-col items-center justify-center m-4 text-center px-4">
              <p className="text-5xl font-bold text-yellow-500">3,245 KW</p>
              <p className="text-2xl py-2">Solar Energy Generated Today</p>
            </div>
            <div className="w-70 h-40 flex-col items-center justify-center m-4 text-center px-4">
              <p className="text-5xl font-bold text-yellow-500">
                11,398,587 KT
              </p>
              <p className="text-2xl py-2">CO2 Emissions This Year</p>
            </div>
            <div className="w-70 h-40 flex-col items-center justify-center m-4 text-center px-4">
              <p className="text-5xl font-bold text-yellow-500">1,567 KW</p>
              <p className="text-2xl py-2">Solar Energy Savings Today</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-black text-white">
          <h2 className="flex text-6xl justify-center items-center font-bold drop-shadow-lg">
            Our Process
          </h2>
          <div className="flex justify-center items-center ml-10 my-4">
            <div className="flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                className="mx-auto"
              >
                <polygon
                  fill="#ff9800"
                  points="37,29 42,24 37,19 37,11 29,11 24,6 19,11 11,11 11,19 6,24 11,29 11,37 19,37 24,42 29,37 37,37"
                ></polygon>
                <path
                  fill="#ffeb3b"
                  d="M13,24c0,6.1,4.9,11,11,11c6.1,0,11-4.9,11-11s-4.9-11-11-11C17.9,13,13,17.9,13,24"
                ></path>
              </svg>
              <p className="text-xl py-4 ml-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                lacus ut enim scelerisque.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center ml-5">
              <img
                src="/images/solarpanel.png"
                className="h-24 w-24"
                alt="Solar Panel"
              ></img>
              <p className="text-xl py-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                lacus ut enim scelerisque.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center ml-5 mr-10">
              <img
                src="/images/lightbulb.png"
                className="h-20 w-20"
                alt="Light Bulb"
              ></img>
              <p className="text-xl py-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                lacus ut enim scelerisque.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <footer className="bg-black">
          <div className="container mx-auto flex justify-between items-center border-t-2 border-yellow-500">
            <div>
              <h3 className="text-yellow-500 text-xl font-bold m-4">
                Footer Title
              </h3>
              <p className="text-gray-400 m-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-yellow-500 hover:text-yellow-400">
                    Link 1
                  </a>
                </li>
                <li>
                  <a href="#" className="text-yellow-500 hover:text-yellow-400">
                    Link 2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-yellow-500 hover:text-yellow-400 mr-4"
                  >
                    Link 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
