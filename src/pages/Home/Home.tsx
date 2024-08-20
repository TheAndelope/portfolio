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
          color1: 0xfc1256,
          color2: 0xffb400,
          birdSize: 1.50,
          wingSpan: 40.00,
          speedLimit: 10.00,
          backgroundColor: 0x343b5c
        })
      );
    }
    return;
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
    >
      <header className="p-4 z-10" >
        <nav className="">
          <ul className="list-none m-0 pt-2 pb-2 pr-2 pl-2 overflow-hidden bg-gray-800">
            <li className="float-left mr-4 hover:text-green"><a href="#">Home</a></li>
            <li className="float-left mr-4 hover:text-green"><a href="#">About</a></li>
            <li className="float-left hover:text-green"><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <h1 className="text-center font-franklin font-normal text-title z-10 text-white">Andy Duong</h1>

            <WordRotate

                words={[
                    "Game Developer",
                    "Mobile Developer",
                    "Hackathon Enthusiast",
                    "Machine Learning Developer",
                    "Web Developer",
                    "Builder"
                ]}
            />
      
    </div>
  );
}

export default Home;
