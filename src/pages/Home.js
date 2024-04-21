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
      <div className="flex flex-col mx-4 items-center xl:items-start xl:mx-24 ">
        <h2 className="font-baloo text-center">
          <span className="text-[#D4AA40] font-bold text-4xl">Cours</span>
          <span className=" text-[#c6941A] font-semibold text-4xl"> de chant </span>
         </h2>
        <h2 className="font-baloo  text-4xl text-center mb-7 ">
          <span className="font-semibold text-[#c6941A]">Et de</span> <span className="text-[#D4AA40] font-bold ">techniques vocales</span>
          </h2>
      </div>
      <div className="relative flex flex-col ">
        <img src={Chorale} alt="chorale" className="w-full h-[803px] object-cover" />
        <PopUp1 className=" z-10 " />
        <div className="flex justify-end items-end relative"> 
        <img src={Chorale2} alt="chorale2"
        className="w-full h-[1000px] object-cover absolute bottom-[-800px] z-[-5]" />
        
        </div> 
        <PopUp2 className="absolute bottom-0 z-20" />
        <img src={Chorale3} alt="chorale3"
        className="w-full h-[1000px] object-cover absolute bottom-[-770px] z-[-5]" />
        </div> 
        <PopUp3 className="absolute bottom-0 z-30" />
        <div className="h-8 w-full xl:hidden"></div>

    </div>
  )
};

export default Home;
