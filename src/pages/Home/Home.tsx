import React from "react"
import WordRotate from "../../components/rotate";
import ThreeBackground from "../../components/background"
const Home: React.FC = () => {
    return (
        <div className="overflow-y-auto">
            <ThreeBackground/>
            <header className="p-4 z-10" >

                <nav>
                    <ul className="list-none m-0 pt-2 pb-2 pr-2 pl-2 overflow-hidden bg-gray-800">
                        <li className="float-left mr-4 hover:text-green"><a href="#">Home</a></li>
                        <li className="float-left mr-4 hover:text-green"><a href="#">About</a></li>
                        <li className="float-left hover:text-green"><a href="#">Contact</a></li>
                    </ul>
                </nav>

                <hr />
            </header>
            <h1 className="text-center font-franklin font-normal text-title z-10">Andy Duong</h1>

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
};

export default Home