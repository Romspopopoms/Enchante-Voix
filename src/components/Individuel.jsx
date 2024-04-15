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
            <div className="absolute left-10 bottom-10 h-auto w-[calc(100%-6rem)] rounded-xl bg-[#EFE386] justify-center font-baloo text-3xl p-2 flex" >
                {/* Ajoutez un bouton pour ouvrir le modal */}
                <button onClick={openModal} className=" text-black rounded hover:text-[#f2c14e] text-center transition-colors duration-300">
                Cours individuel ou collectif
                </button>
            </div>
            {/* Conditionnellement affichez le modal basé sur l'état modalOpen */}
            {modalOpen && <ModalIndividuel onClose={closeModal} />}
        </div>
    );
};

export default Individuel;
