import React from'react';
import  { motion } from 'framer-motion'

const ModalChorale = ({ onClose }) => {
    return (
        <motion.div className="fixed inset-0 bg-opacity-30 bg-cover bg-black flex justify-center items-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className="bg-black/30 bg-opacity-90 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-2xl w-full space-y-12"
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0.9 }}
            >
                <h2 className="text-center text-3xl font-bold text-[#C6941A]">Chorale EnChante'Voix</h2>
                <p className="text-center text-lg text-[#D4AA40]">Avec l'association Tadlachance sur Cuges les pins :<br></br><br></br>tous les lundi de 18h30 à 19h30 
à la salle d'art plastique sur Cuges les pins.<br></br><br></br>
(entrée extérieure par la place Gabriel Viale) </p>
                <div className="flex justify-center items-center">
                <button onClick={onClose} className="py-2 px-4 bg-[#f2c14e] text-accent rounded hover:bg-white hover:text-[#f2c14e] transition-colors duration-300">
                    Fermer
                </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ModalChorale