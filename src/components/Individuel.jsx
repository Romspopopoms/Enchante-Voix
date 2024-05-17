import React, { useState } from "react";
import individuel from "../assets/Rectangle 6.png";
import ModalIndividuel from "./ModalIndividuel"; // Importez votre composant modal

const Individuel = () => {
    const [modalOpen, setModalOpen] = useState(false); // État pour gérer la visibilité du modal

    // Fonction pour ouvrir le modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Fonction pour fermer le modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="h-auto w-auto relative">
            <img src={individuel} alt="logo" className="h-full w-full rounded-lg object-cover" />
            <div className="absolute left-[19%] xl:left-[28%] bottom-10 h-auto w-auto rounded-3xl bg-[#EFE386] justify-center font-baloo text-lg xl:text-xl p-2 xl:px-8 flex font-extrabold" >
                {/* Ajoutez un bouton pour ouvrir le modal */}
                <button onClick={openModal} className=" text-black rounded hover:text-[#A47A32] text-center transition-colors duration-300">
                Cours individuel ou collectif
                </button>
            </div>
            {/* Conditionnellement affichez le modal basé sur l'état modalOpen */}
            {modalOpen && <ModalIndividuel onClose={closeModal} />}
        </div>
    );
};

export default Individuel;
