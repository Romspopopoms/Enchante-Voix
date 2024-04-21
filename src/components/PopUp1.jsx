import React from "react";

const PopUp1 = () => {
    return (
        <div className="relative h-auto
        w-auto xl:h-[1169px] xl:w-[720px] flex flex-col bg-[rgb(252,251,250)] items-center justify-center font-baloo mt-[-250px] mx-4 shadow-xl rounded-lg p-8">
            <h1 className="font-extrabold text-3xl xl:text-5xl text-center absolute top-12 xl:top-28 text-[#e5bc54] ">Vous chercher <br></br>à developper votre voix ?</h1>
            <div className="flex flex-col gap-y-4 xl:gap-y-20 mt-28 xl:mt-52">
            <p className=" text-[#C6941A] text-center text-xl xl:text-3xl font-semibold font-baloo">Que ce soit pour vous initier ou vous<br></br> 
perfectionner,</p>
<p className=" text-[#D4AA40] text-center text-xl xl:text-3xl font-baloo">
les cours proposés sont issus d’une <br></br> 
méthode moderne et innovante. 
</p>
<p className=" text-[#D4AA40] text-center text-xl xl:text-3xl font-baloo">
Ils sont adaptés à chacun de vos besoins. 
</p>
<p className=" text-[#D4AA40] text-center text-xl xl:text-3xl font-baloo leading-relaxed"> 
Cette pédagogie est dite active<br></br> 
car vous serez vous-même acteur de<br></br> 
votre propre apprentissage : <br></br>
vous serez guidé dans l’exploration <br></br>
et l’éveil de vos sensations corporelles <br></br>
et mentales, au travers des techniques qui <br></br>
vous aideront à optimiser votre.. <br></br><br></br>
                <span className="font-bold text-[#C6941A] text-center text-2xl xl:text-3xl ">PLEIN POTENTIEL !</span> 
                </p>
            </div>
        </div>
    )
}

export default PopUp1 