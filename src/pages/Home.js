import React from "react";
import Chorale from "../assets/CHORALE.jpg"
import PopUp1 from "../components/PopUp1"
import PopUp2 from "../components/PopUp2"
import Chorale2 from "../assets/Rectangle 9.png"
import Chorale3 from "../assets/Rectangle 12.png"
import PopUp3 from "../components/PopUp3";
const Home = () => {
  return (
    <div className="w-full h-full mt-40 xl:mt-32">
      <div className="flex flex-col mx-4 items-center xl:items-start xl:mx-64">
        <h2 className="font-baloo text-4xl text-center text-[#C6941A]">Cours de chant</h2>
        <h2 className="font-baloo text-4xl text-center text-[#C6941A]">Et de techniques vocales</h2>
      </div>
      <div className="relative flex flex-col mt-4">
        <img src={Chorale} alt="chorale" className="w-full h-[803px] object-cover" />
        <PopUp1 className=" z-10 " />
        <div className="flex justify-end items-end relative"> 
        <img src={Chorale2} alt="chorale2"
        className="w-full h-[1000px] object-cover absolute bottom-[-850px] z-[-5]" />
        
        </div> 
        <PopUp2 className="absolute bottom-0 z-20" />
        <img src={Chorale3} alt="chorale3"
        className="w-full h-[1000px] object-cover absolute bottom-[-850px] z-[-5]" />
        </div> 
        <PopUp3 className="absolute bottom-0 z-30" />
        <div className="h-8 w-full xl:hidden"></div>

    </div>
  );
};

export default Home;
