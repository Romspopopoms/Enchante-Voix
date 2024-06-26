import React from "react";

const PopUp5 = () => {
    return (
        <div className="relative h-auto w-auto xl:w-[500px] flex flex-col bg-[rgb(252,251,250)] items-center justify-center font-baloo mt-[-200px] shadow-md mx-6 p-8 ">

<h1 className="absolute top-16 font-extrabold text-2xl xl:text-3xl text-center text-[#C6941A] xl:">Infos de paiement</h1>
<p className="xl:mt-28 text-[#D4AA40] text-center text-lg xl:text-xl font-baloo mt-20 ">Les cours sont assurés hors périodes vacances scolaires.<br></br>
<br></br>


Pour toute inscription à l'année (de septembre à juin et hors vacances scolaire) tous les cours seront facturés 30€ pour les cours d'1h avec -10% supplémentaire et 15€ pour les cours de 30min avec -5% supplémentaire
<br></br><br></br>

Possibilité de payer au mois.
Tout cours annulé 24h avant pourra être rattraper au maximum dans le mois qui suit. Dans d'autres circonstances, le cours sera dû.</p>

        </div>
    )
}

export default PopUp5