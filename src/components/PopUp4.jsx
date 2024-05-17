import React from "react";

const PopUp4 = () => {
    return (
        <div className="h-auto w-auto xl:w-[500px] flex flex-col bg-[rgb(252,251,250)] items-center justify-center gap-y-12 font-baloo mt-[-200px] shadow-md mx-6 p-8 ">

<h1 className=" font-extrabold text-2xl xl:text-3xl text-center text-[#C6941A]">Tarifs Horaires</h1>
<p className="text-[#D4AA40] text-center text-lg xl:text-xl font-baloo"><span className="font-bold text-[#C6941A] text-center text-lg xl:text-xl  ">Cours d'1h :</span> <br></br>
40€/h pour 1 ou 2 cours par mois.
<br></br>
30€/h pour 3 ou 4 cours par mois.
<br></br><br></br>
<span className="font-bold text-[#C6941A] text-center text-lg xl:text-xl ">Cours de 30min (hors domicile):
</span>
<br></br>
20€ le cours pour 1 ou 2 cours par mois.<br></br>
15€ le cours pour 3 ou 4 cours par mois. <br></br><br></br>
                <span className="font-bold text-[#C6941A] text-center text-lg xl:text-xl  ">Les packs</span>
                <br></br><br></br>
                <span className="font-bold text-[#C6941A] text-center text-lg xl:text-xl ">5H :</span> 180€ valable 3 mois.
                <br></br>
                <span className="font-bold text-[#C6941A] text-center text-lg xl:text-xl ">10H :</span>  350 € valable 6 mois.
                 </p>

        </div>
    )
}

export default PopUp4