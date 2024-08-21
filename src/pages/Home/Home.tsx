import { useEffect, useState, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";
import WordRotate from "../../components/rotate";
import { FaGithub, FaDev, FaItchIo } from 'react-icons/fa';

interface ProjectDetail {
  title: string;
  description: string;
  img?: string;
  demo?: string;
  sum?: string;
  tags?: string[];
  links?: { [key: string]: string };
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
          backgroundColor: 0x7b8cff,
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
    { title: "Identibear", description: "Identibear is a project designed to assist individuals with memory-related conditions, such as dementia and prosopagnosia, by recognizing faces and offering contextual information about them. Users upload a short video of a person’s face, along with details like their name, relationship, and significant memories. The system processes the video to extract frames, which are then used to train a Convolutional Neural Network (CNN). This model is integrated with a real-time webcam feed, enabling it to identify individuals and provide instant feedback, including their name and relationship to the user. The project combines machine learning with practical application, offering a user-friendly interface to support memory and recognition needs. In this project, I was tasked with the development and training of the CNN model for Identibear, which involved processing video data into images and applying feature engineering to improve the dataset for training. I also enhanced the dataset through data augmentation via preprocessing layers. Additionally, I implemented real-time image processing, enabling the model to recognize faces from a live camera feed and provide personalized information.", img: '/images/IdentiBear.png', demo: 'ndMO66xyYUE', sum: 'A Machine Learning tool designed to aid Dementia and Prosopagnosia patients submitted to Hack The 6ix.', tags: ['Python', 'Keras', 'OpenCV', 'Machine Learning'], links: { github: 'https://github.com/Solaror0/Identibear', devpost: 'https://devpost.com/software/identibear-your-memory-companion' } },
    { title: "Tutorist", description: "Details for Project 2" },
    { title: "Neo Developer League", description: "Details for Project 3" },
    { title: "Itch", description: "Details for Project 4" }
  ];

  return (
    <>
      <div id="vanta-bg" className="h-[40rem]">
        <header className="p-4 z-10">
          <nav className="fixed top-0 left-0 m-2 z-10">
            <ul className="list-none m-0 p-2 bg-white overflow-hidden shadow-custom rounded-2xl flex justify-start items-center">
              <li className="mr-4 ml-2">
                <a href="Home" className="text-subtitle">Home</a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-subtitle">About</a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-subtitle">Contact</a>
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
              "Horror Aficionado",
              "ML Developer",
              "Competitive Programmer",
              "Web Developer",
              "Engineering Enthusiast",
              "Stargazer",
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
            projectSectionRefs.current[index] = el as HTMLDivElement;
          }}
          className="relative w-full h-[80rem] bg-skyblue py-10"
        >

          <div className="relative h-full">
            <div className="sticky top-0 w-full bg-skyblue p-10" ref={stickyRef}>
              <div className="project-container flex flex-col md:flex-row items-start justify-between">
                <div className="project-card bg-white p-6 rounded-lg shadow-custom w-full md:w-2/5 mb-10 backdrop-blur-lg bg-white bg-opacity-10 border border-opacity-30 border-white rounded-lg">
                  <h2 className="text-5xl text-center pb-5 text-secondary">{project.title}</h2>
                  <div className="project-links flex justify-between">

                    <div className="video-container mx-auto">
                      <iframe
                        width="360"
                        height="250"
                        src={"https://www.youtube.com/embed/" + project.demo}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>

                  </div>
                  <div className="flex">
                    <p className="mt-4 mx-auto text-center text-white text-xl font-semibold">{project.sum}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    {project.tags?.map((str, index) => (
                      <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{str}</span>

                    ))}
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    {project.links?.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-black hover:text-secondary">
                        <FaGithub size={24} />
                      </a>
                    )}
                    {project.links?.devpost && (
                      <a href={project.links.devpost} target="_blank" rel="noopener noreferrer" className="text-black hover:text-secondary">
                        <FaDev size={24} />
                      </a>
                    )}
                    {project.links?.itch && (
                      <a href={project.links.itch} target="_blank" rel="noopener noreferrer" className="text-black hover:text-secondary">
                        <FaItchIo size={24} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-details w-1/2 md:2/5 mb-10 text-xl">

                  <p className="text-secondary text-center">{project.description}</p>
                </div>
              </div>
            </div>
          </div>

          {index < projectDetails.length - 1 && (
            <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none">
              <div
                className="cloud w-full h-full"
                style={{
                  transform: `translateX(${scrollProgress[index] * 150 - (index * 20)}%)`,
                  backgroundImage: "url('/images/cloud.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s linear',
                }}
              ></div>
            </div>
          )}
        </section>
      ))}
      <footer className="bg-skyblue">
      </footer>
    </>
  );
}

export default Home;
