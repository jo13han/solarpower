"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowNavbar(scrollTop === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section>
        {showNavbar && (
          <nav className="flex justify-center items-center absolute top-0 left-0 right-0 bg-transparent py-4 z-10">
            <button
              className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 mr-4 ${
                hoveredButton === 'process' ? '' : ''
              }`}
              onMouseEnter={() => setHoveredButton('process')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Process
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === 'process' ? 'transform scale-x-100' : 'transform scale-x-0'
                }`}
              ></span>
            </button>
            <button
              className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 mr-4 ${
                hoveredButton === 'services' ? '' : ''
              }`}
              onMouseEnter={() => setHoveredButton('services')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Services
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === 'services' ? 'transform scale-x-100' : 'transform scale-x-0'
                }`}
              ></span>
            </button>
            <button
              className={`relative bg-transparent text-gray-800 font-bold py-2 px-4 ${
                hoveredButton === 'connect' ? '' : ''
              }`}
              onMouseEnter={() => setHoveredButton('connect')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Connect
              <span
                className={`absolute left-0 right-0 bottom-0 h-1 bg-yellow-300 transition-all duration-300 ${
                  hoveredButton === 'connect' ? 'transform scale-x-100' : 'transform scale-x-0'
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
              <p className="text-5xl font-bold text-yellow-500">2,145 KT</p>
              <p className="text-2xl py-2">CO2 Emissions Avoided Today</p>
            </div>
            <div className="w-70 h-40 flex-col items-center justify-center m-4 text-center px-4">
              <p className="text-5xl font-bold text-yellow-500">1,567 KW</p>
              <p className="text-2xl py-2">Solar Energy Savings Today</p>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
}
