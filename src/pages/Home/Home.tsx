import { useEffect, useState, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";
import WordRotate from "../../components/rotate";

interface ProjectDetail {
  title: string;
  description: string;
}

function Home() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [scrollProgress, setScrollProgress] = useState<number[]>([]);
  const projectSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  // Initialize Vanta effect
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: document.getElementById("vanta-bg"),
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color1: 0xff0000,
          color2: 0x00d1ff,
          birdSize: 1.5,
          wingSpan: 40.0,
          speedLimit: 10.0,
          backgroundColor: 0x94a6ff,
          colorMode: "varianceGradient",
        })
      );
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy(); // Clean up on unmount
      }
    };
  }, [vantaEffect]);

  // Handle scroll to update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;

      const newProgress = projectSectionRefs.current.map((sectionRef) => {
        if (sectionRef) {
          const sectionTop = sectionRef.getBoundingClientRect().top + scrollTop;
          const maxScroll = document.documentElement.scrollHeight - viewportHeight;

          if (scrollTop > sectionTop - viewportHeight) {
            const progress = Math.min(1, (scrollTop - sectionTop) / (maxScroll - sectionTop));
            return progress;
          }
        }
        return 0;
      });

      setScrollProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const projectDetails: ProjectDetail[] = [
    { title: "IdentiBear", description: "Details for Project 1" },
    { title: "Tutorist", description: "Details for Project 2" },
    { title: "Neo Developer League", description: "Details for Project 3" },
  ];

  return (
    <>
      <div id="vanta-bg" className="h-[40rem]">
        <header className="p-4 z-10">
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
        <div className="flex flex-col items-center justify-center h-screen p-4 -mt-16">
          <h1 className="text-center font-franklin font-normal text-title z-10 text-white">
            Hey! I'm Andy Duong
          </h1>
          <h1 className="text-xl text-center font-franklin font-normal text-title z-10 text-white">
            and I'm a
          </h1>
          <WordRotate
            words={[
              "Game Developer",
              "High Schooler",
              "Mobile Developer",
              "Hackathon Enthusiast",
              "ML Developer",
              "Web Developer",
              "Engineering Enthusiast",
            ]}
          />
        </div>
      </div>

      <section>
        <h1 className="bg-skyblue p-2 pt-10 text-center text-5xl text-accent">Projects</h1>
      </section>

      {projectDetails.map((project, index) => (
        <section
          key={index}
          ref={(el) => {
            // Explicitly cast to HTMLDivElement
            projectSectionRefs.current[index] = el as HTMLDivElement;
          }}
          className="relative w-full h-[80rem] bg-skyblue py-10"
        >
          <h2 className="text-center text-4xl mb-10">{project.title}</h2>

          <div className="relative h-full">
            <div className="sticky top-0 w-full bg-skyblue p-10" ref={stickyRef}>
              <div className="project-container flex flex-col items-center">
                <div className="project-card bg-white p-6 rounded-lg shadow-lg w-2/5 mb-10">
                  <img
                    src="/path-to-image.jpg"
                    alt="Project"
                    className="w-full h-auto mb-4"
                  />
                  <div className="project-links flex justify-between">
                    <a href="#" className="text-blue-500">Live Demo</a>
                    <a href="#" className="text-blue-500">GitHub Repo</a>
                  </div>
                  <p className="mt-4">Brief description of the project.</p>
                </div>

                <div className="project-details w-2/5 mb-10">
                  <h3 className="text-3xl mb-4">{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </div>

          {index < projectDetails.length - 1 && (
            <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none">
              <div
                className="cloud w-full h-full"
                style={{
                  transform: `translateX(${scrollProgress[index] * 150 - (index * 50)}%)`,
                  backgroundImage: "url('/images/cloud.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease-out',
                }}
              ></div>
            </div>
          )}
        </section>
      ))}
    </>
  );
}

export default Home;
