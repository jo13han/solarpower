"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SolarPanel from "@/components/SolarPanel";
import { useAppDispatch } from "@/components/reduxHooks";
import { setHarvesting } from "@/components/UISlice";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowNavbar(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    countUpto(document.querySelector("#energy_count"), 3245, 2000, "KW");
    countUpto(document.querySelector("#co2_count"), 11398587, 2000, "KT");
    countUpto(document.querySelector("#savings_count"), 1567, 2000, "KW");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(id) as HTMLElement | null;
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  function countUpto(elem: HTMLElement | null, target: number, duration: number, unit: string) {
    if (!elem) return;

    let count = 0;
    const intervalDuration = 10; // Interval duration in milliseconds
    const frames = duration / intervalDuration; // Total number of frames
    const increment = target / frames; // Increment value per frame

    let currentCount = 0;

    const interval = setInterval(() => {
      if (currentCount < target) {
        currentCount += increment;
        elem.innerHTML = Math.ceil(currentCount) + " " + unit;
      } else {
        clearInterval(interval);
      }
    }, intervalDuration);
  }

  return (
    <>
      <section id="Front">
        {showNavbar && (
          <nav className="flex justify-center items-center absolute top-0 left-0 right-0 bg-transparent py-4 z-10">
            <button
              className={`relative text-2xl bg-transparent text-gray-800 font-bold py-2 px-4 mr-4 ${
                hoveredButton === "process" ? "" : ""
              }`}
              onMouseEnter={() => setHoveredButton("process")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={(e) => handleSmoothScroll(e, "#Process")} // Smooth scroll to #Process section
            >
              Process
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === "process" ? "transform scale-x-100" : "transform scale-x-0"
                }`}
              ></span>
            </button>
            <button
              className={`relative text-2xl bg-transparent text-gray-800 font-bold py-2 px-4 mr-4 ${
                hoveredButton === "services" ? "" : ""
              }`}
              onMouseEnter={() => setHoveredButton("services")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={(e) => handleSmoothScroll(e, "#Stats")} // Smooth scroll to #Stats section
            >
              Services
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === "services" ? "transform scale-x-100" : "transform scale-x-0"
                }`}
              ></span>
            </button>
            <button
              className={`relative text-2xl bg-transparent text-gray-800 font-bold py-2 px-4 ${
                hoveredButton === "connect" ? "" : ""
              }`}
              onMouseEnter={() => setHoveredButton("connect")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={(e) => handleSmoothScroll(e, "#Footer")} // Smooth scroll to #Footer section
            >
              Connect
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === "connect" ? "transform scale-x-100" : "transform scale-x-0"
                }`}
              ></span>
            </button>
          </nav>
        )}
        <div className="relative w-full h-[100vh] flex flex-row justify-center overflow-hidden">
          <video
            className="w-full absolute"
            muted={true}
            autoPlay={true}
            loop={true}
            preload="auto"
            src="/hero_video.mp4"
          ></video>
          <h5
            className="text-8xl absolute bottom-56 font-bold z-10 text-yellow-300 bg-clip-text from-yellow-400 to-red-600"
            style={{
              textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            Neolectra
          </h5>

          <h1 className="text-5xl text-white absolute bottom-36 font-bold">
            Build Your Green Future With Renewable Energy!
          </h1>

          <div className="absolute bottom-10 z-10 flex justify-center w-full">
            <div className="mx-4">
              <Link href={"/map"}>
                <button
                  onClick={() => dispatch(setHarvesting(false))}
                  className="text-white text-2xl hover:text-yellow-500 font-bold"
                >
                  Solar Solutions -{">"}
                </button>
              </Link>
            </div>
            <div className="mx-4">
              <Link href={"/map"}>
                <button
                  onClick={() => dispatch(setHarvesting(true))}
                  className="text-white text-2xl hover:text-blue-500 font-bold"
                >
                  Rainwater Harvesting Solutions -{">"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="Stats">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-black text-white py-8 opacity-0"
        >
          <div className="flex flex-row justify-center">
            <div className="h-40 flex-col items-center justify-center m-4 text-center px-4">
              <p id="energy_count" className="text-5xl font-bold text-yellow-500">
                3,245 KW
              </p>
              <p className="text-2xl py-2">Solar Energy Generated Today</p>
            </div>
            <div className="h-40 flex-col items-center justify-center m-4 text-center px-4">
              <p id="co2_count" className="text-5xl font-bold text-yellow-500">
                11,398,587 KT
              </p>
              <p className="text-2xl py-2">CO2 Emissions This Year</p>
            </div>
            <div className="h-40 flex-col items-center justify-center m-4 text-center px-4">
              <p id="savings_count" className="text-5xl font-bold text-yellow-500">
                1,567 KW
              </p>
              <p className="text-2xl py-2">Solar Energy Savings Today</p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="h-96">
        <SolarPanel />
      </section>
      <section id="Process">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-black text-white">
          <h2 className="flex text-6xl justify-center items-center font-bold drop-shadow-lg mb-24">Our Processes</h2>
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
              <p className="text-xl py-4 ml-8 ">
                Enter your address to receive a detailed assessment of your rooftop&apos;s solar potential. Our
                platform recommends the best solar panel setup tailored to your roof and energy requirements, making
                solar adoption hassle-free.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center ml-5">
              <img src="/images/solarpanel.png" className="h-24 w-24" alt="Solar Panel"></img>
              <p className="text-xl py-8">
                Discover top-rated vendors and products optimized for your solar project. Our tools help you choose the
                most efficient and cost-effective solar panels, ensuring you get the best solution for your needs.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center ml-5 mr-10">
              <img src="/images/lightbulb.png" className="h-20 w-20" alt="Light Bulb"></img>
              <p className="text-xl py-6">
                Explore available financial incentives and rebates to make solar installation more affordable. We guide
                you through loan options and facilitate the setup of net metering connections, maximizing your solar
                savings and grid interaction.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-black text-white">
          <div className="container mx-auto flex justify-between items-center border-t-2 border-yellow-500"> </div>
          <div className="flex justify-center items-center ml-10 my-4 mb-24">
            <div className="flex flex-col justify-center items-center ml-5">
              <img src="/images/waterdrop.png" className="h-20 w-20" alt="Water Drop"></img>
              <p className="text-xl py-6">
                Evaluate the potential for rainwater harvesting by analyzing rooftop area and local precipitation data
                to estimate water yield and identify suitable storage locations.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center ml-5">
              <img src="/images/valley.png" className="h-20 w-24" alt="Valley"></img>
              <p className="text-xl py-6">
                Design and implement efficient rainwater harvesting systems tailored to building needs, optimizing
                design for maximum water utilization and implementing smart monitoring for effective management.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center ml-5 mr-10">
              <img src="/images/watertank.png" className="h-16 w-24" alt="Water Tank"></img>
              <p className="text-xl py-6">
                Conduct comprehensive analysis of economic viability and environmental benefits, including cost-benefit
                analysis and guidance on accessing financial incentives and subsidies.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="Footer">
        <footer className="bg-black">
          <div className="container mx-auto flex justify-between items-center border-t-2 border-yellow-500">
            <div className="flex items-center m-4">
              {" "}
              {/* Utilize flexbox to align items */}
              <h3 className="text-yellow-500 text-xl font-bold">neolectra@gmail.com</h3>
              <p className="ml-80 text-slate-300">©2024 Neolectra India</p>
            </div>
            <div className="flex py-6">
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-yellow-500 hover:text-yellow-400">
                    <img src="/images/instagram.png" alt="Instagram" className="h-10 w-10"></img>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-yellow-500 hover:text-yellow-400">
                    <img src="/images/facebook.png" alt="facebook" className="h-10 w-10"></img>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-yellow-500 hover:text-yellow-400">
                    <img src="/images/linkedin.png" alt="linkedin" className="h-10 w-10 mr-10"></img>
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
