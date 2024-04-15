import Chorale from "../components/Chorale";
import Individuel from "../components/Individuel";

const Activites = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-40 xl:mt-28 gap-y-8 ">
            <h1 className="font-baloo text-4xl text-center text-[#C6941A] mt-4">Les Activités</h1>    
            <div className=" w-full flex justify-center flex-col xl:flex-row gap-4">
                <Individuel />
                <Chorale />
            </div>
            <div className=" w-full xl:hidden"></div>
        </div>
    )
}

export default Activites;