import chants from "../assets/Rectangle 12.png";
import PopUp4 from "../components/PopUp4";
import PopUp5 from "../components/PopUp5";

const Tarifs = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-40 xl:mt-28 gap-y-8 ">
            <h1 className="font-baloo text-4xl text-center text-[#C6941A] mt-4">Tarifs</h1>
            <img src={chants} alt="chants" className="w-full h-[776px] object-cover" />
            <div className="flex justify-center flex-col xl:flex-row gap-80 xl:gap-4">
            <PopUp4 className="z-10" />
            <PopUp5 className="z-10"/>
            </div>

            <div className="h-8 w-full xl:hidden"></div>
        </div>
    )
}

export default Tarifs;