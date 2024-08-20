import { useRef, useState, useEffect } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";

import WordRotate from "../../components/rotate";


function Home() {

  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,

          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color1: 0xff0000,
          color2: 0x00d1ff,
          birdSize: 1.50,
          wingSpan: 40.00,
          speedLimit: 10.00,
          backgroundColor: 0x94a6ff,
          colorMode: "varianceGradient"
        })
      );
    }
    return;
  }, [vantaEffect]);

  return (
    <>
      <div
        ref={vantaRef}
      >
        <header className="p-4 z-10" >
          <nav className="fixed top-0 left-0 m-2 z-10">
            <ul className="list-none m-0 p-2 bg-white overflow-hidden shadow-custom rounded-2xl flex justify-start items-center">
              <li className="mr-4 ml-2">
                <a href="#" className="text-accent">Home</a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-accent">About</a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-accent">Contact</a>
              </li>
            </ul>
          </nav>
        </header>
        <h1 className="text-center font-franklin font-normal text-title z-10 text-white">Andy Duong</h1>

        <WordRotate

          words={[
            "Game Developer",
            "High Schooler",
            "Mobile Developer",
            "Hackathon Enthusiast",
            "Machine Learning Developer",
            "Web Developer",
            "Builder"
          ]}
        />

      </div>
    </>
  );
}

export default Home;
