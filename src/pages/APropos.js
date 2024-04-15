import Chorales from "../assets/CHORALE.jpg"
import PopUp6 from "../components/PopUp6";
const APropos = () => {
    return (
        <div className="relative flex flex-col items-center justify-center mt-40 xl:mt-28 gap-y-8 ">
        <h1 className="font-baloo text-4xl text-center text-[#C6941A] mt-4">A Propos</h1>
        <img src={Chorales} alt="chants" className="w-full h-[776px] object-cover" />
        
        <PopUp6 className=" z-10 " />
        <div className="xl:absolute xl:bottom-0 xl:right-10 h-auto w-auto p-8 flex flex-col justify-center items-center gap-4 rounded-lg bg-[#f6f6ea] shadow-xl ">
        <h1 className="font-baloo text-4xl text-center text-[#C6941A] underline">
        Contact :
        </h1>
        <p className="text-[#D4AA40] text-center text-lg xl:text-xl font-baloo">marlene@enchantevoix.fr
            </p>
            <p className="text-[#D4AA40] text-center text-lg xl:text-xl font-baloo">06 12 41 69 22
            </p>
        </div>
        <div className="h-8 w-full xl:hidden"></div>
        </div>

    )
}

export default APropos;