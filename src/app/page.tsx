"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      <section id="Front">
        {showNavbar && (
          <nav className="flex justify-center items-center absolute top-0 left-0 right-0 bg-transparent py-4 z-10">
            <button
              className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 mr-4 ${
                hoveredButton === "process" ? "" : ""
              }`}
              onMouseEnter={() => setHoveredButton("process")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <a href="#Process">Process</a>
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
              <a href="#Footer">Connect</a>
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === "connect"
                    ? "transform scale-x-100"
                    : "transform scale-x-0"
                }`}
              ></span>
            </button>
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
          <h5
            className="text-8xl absolute bottom-44 font-bold z-10 text-yellow-300 bg-clip-text from-yellow-400 to-red-600"
            style={{
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            Neolectra
          </h5>

          <h1 className="text-4xl text-white absolute bottom-28 font-bold">
            Build Your Green Future With Renewable Energy!
          </h1>

          <div className="absolute bottom-10 z-10">
            <Link href={"/map"}>
              <button className="text-white text-2xl hover:text-yellow-500 font-bold">
                Take Me There -{">"}
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section id="Stats">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-black text-white py-8 opacity-0"
        >
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
        </motion.div>
      </section>
      <section id="Process">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-black text-white"
        >
          <h2 className="flex text-6xl justify-center items-center font-bold drop-shadow-lg mb-24">
            Our Process
          </h2>
          <div className="flex justify-center items-center ml-10 my-4 mb-24">
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
              Enter your address to receive a detailed assessment of your rooftop &apos;s solar potential. Our platform recommends the best solar panel setup tailored to your roof and energy requirements, making solar adoption hassle-free.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center ml-5">
              <img
                src="/images/solarpanel.png"
                className="h-24 w-24"
                alt="Solar Panel"
              ></img>
              <p className="text-xl py-8">
              Discover top-rated vendors and products optimized for your solar project. Our tools help you choose the most efficient and cost-effective solar panels, ensuring you get the best solution for your needs.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center ml-5 mr-10">
              <img
                src="/images/lightbulb.png"
                className="h-20 w-20"
                alt="Light Bulb"
              ></img>
              <p className="text-xl py-6">
              Explore available financial incentives and rebates to make solar installation more affordable. We guide you through loan options and facilitate the setup of net metering connections, maximizing your solar savings and grid interaction.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="Footer">
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
