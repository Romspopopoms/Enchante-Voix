import Chorales from "../assets/CHORALE.jpg"
import PopUp6 from "../components/PopUp6";
const APropos = () => {
    return (
        <div className="relative flex flex-col items-center justify-center mt-40 xl:mt-28 gap-y-8">
        <h1 className="font-baloo text-4xl text-center text-[#C6941A] mt-4">A Propos</h1>
        <img src={Chorales} alt="chants" className="w-full h-[776px] object-cover" />
        
        <PopUp6 className=" z-10 " />
        <div className="xl:absolute xl:bottom-0 xl:right-10 h-auto w-auto p-8 flex flex-col justify-center items-center gap-4  bg-[#fffffd] shadow-top ">
        <h1 className="font-baloo text-4xl text-center text-[#C6941A] ">
        Contact :
        </h1>
        
        <a href="mailto:marlene@enchantevoix.fr" className="text-[#D4AA40] text-center text-lg xl:text-xl font-baloo underline">marlene@enchantevoix.fr
            </a>
            <p className="text-[#D4AA40] text-center text-lg xl:text-xl font-baloo">06 12 41 69 22
            </p>
        </div>
        <div className="h-8 w-full xl:hidden"></div>
        </div>

    )
}

export default APropos;